from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
from typing import List

app = FastAPI(title="DCF Calculator API", description="Discounted Cash Flow Calculator API", version="1.0.0")

# Add CORS middleware to allow requests from Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DCFInput(BaseModel):
    current_earnings: float
    discount_rate: float
    growth_rate: float
    terminal_growth: float
    
    @field_validator('current_earnings')
    @classmethod
    def validate_current_earnings(cls, v):
        if v <= 0:
            raise ValueError('Current earnings must be positive')
        return v
    
    @field_validator('discount_rate')
    @classmethod
    def validate_discount_rate(cls, v):
        if v <= 0 or v >= 1:
            raise ValueError('Discount rate must be between 0 and 1')
        return v
    
    @field_validator('growth_rate')
    @classmethod
    def validate_growth_rate(cls, v):
        if v < 0 or v >= 1:
            raise ValueError('Growth rate must be between 0 and 1')
        return v
    
    @field_validator('terminal_growth')
    @classmethod
    def validate_terminal_growth(cls, v):
        if v < 0 or v >= 1:
            raise ValueError('Terminal growth rate must be between 0 and 1')
        return v

class YearlyProjection(BaseModel):
    year: int
    future_earnings: float
    present_value: float

class DCFResult(BaseModel):
    current_earnings: float
    discount_rate: float
    growth_rate: float
    terminal_growth: float
    yearly_projections: List[YearlyProjection]
    year_6_earnings: float
    terminal_value: float
    pv_terminal_value: float
    total_pv_5years: float
    total_dcf_value: float
    five_year_percentage: float
    terminal_percentage: float

def calculate_dcf_logic(input_data: DCFInput) -> DCFResult:
    """
    Core DCF calculation logic extracted from the original dcf.py
    """
    current_earnings = input_data.current_earnings
    discount_rate = input_data.discount_rate
    growth_rate = input_data.growth_rate
    terminal_growth = input_data.terminal_growth
    
    # Validate that discount rate > terminal growth rate
    if discount_rate <= terminal_growth:
        raise ValueError("Discount rate must be greater than terminal growth rate")
    
    # Calculate projections for next 5 years
    yearly_projections = []
    present_values = []
    
    for year in range(1, 6):
        future_earnings = current_earnings * ((1 + growth_rate) ** year)
        present_value = future_earnings / ((1 + discount_rate) ** year)
        present_values.append(present_value)
        
        yearly_projections.append(YearlyProjection(
            year=year,
            future_earnings=future_earnings,
            present_value=present_value
        ))
    
    # Terminal value calculation
    year_5_earnings = yearly_projections[4].future_earnings
    year_6_earnings = year_5_earnings * (1 + terminal_growth)
    terminal_value = year_6_earnings / (discount_rate - terminal_growth)
    pv_terminal_value = terminal_value / ((1 + discount_rate) ** 5)
    
    # Summary calculations
    total_pv_5years = sum(present_values)
    total_dcf_value = total_pv_5years + pv_terminal_value
    
    five_year_percentage = (total_pv_5years / total_dcf_value) * 100
    terminal_percentage = (pv_terminal_value / total_dcf_value) * 100
    
    return DCFResult(
        current_earnings=current_earnings,
        discount_rate=discount_rate,
        growth_rate=growth_rate,
        terminal_growth=terminal_growth,
        yearly_projections=yearly_projections,
        year_6_earnings=year_6_earnings,
        terminal_value=terminal_value,
        pv_terminal_value=pv_terminal_value,
        total_pv_5years=total_pv_5years,
        total_dcf_value=total_dcf_value,
        five_year_percentage=five_year_percentage,
        terminal_percentage=terminal_percentage
    )

@app.get("/")
async def root():
    return {"message": "DCF Calculator API", "version": "1.0.0"}

@app.post("/calculate-dcf", response_model=DCFResult)
async def calculate_dcf(input_data: DCFInput):
    """
    Calculate Discounted Cash Flow based on input parameters
    """
    try:
        result = calculate_dcf_logic(input_data)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)