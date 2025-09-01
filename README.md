# DCF Calculator Web Application

A modern web application for calculating Discounted Cash Flow (DCF) analysis to determine the intrinsic value of investments.

## Architecture

### Backend (FastAPI)
- **Location**: `backend/`
- **Technology**: Python with FastAPI
- **Features**:
  - RESTful API for DCF calculations
  - Input validation using Pydantic models
  - CORS support for frontend integration
  - Comprehensive error handling

### Frontend (Next.js + Tailwind CSS)
- **Location**: `frontend/`
- **Technology**: Next.js 15 with TypeScript and Tailwind CSS
- **Features**:
  - Responsive design with modern UI
  - Real-time form validation
  - Interactive results visualization
  - Progress bars for value breakdown

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```
The API will be available at `http://localhost:8000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The web app will be available at `http://localhost:3000`

## API Endpoints

### POST /calculate-dcf
Calculate DCF based on input parameters.

**Request Body:**
```json
{
  "current_earnings": 100000,
  "discount_rate": 0.10,
  "growth_rate": 0.08,
  "terminal_growth": 0.03
}
```

**Response:**
```json
{
  "current_earnings": 100000.0,
  "discount_rate": 0.1,
  "growth_rate": 0.08,
  "terminal_growth": 0.03,
  "yearly_projections": [...],
  "total_dcf_value": 1815818.4042854216,
  "five_year_percentage": 26.069758860679737,
  "terminal_percentage": 73.93024113932026
}
```

## Features

1. **Input Parameters**:
   - Current Year Owner Earnings
   - Discount Rate
   - Growth Rate (first 5 years)
   - Terminal Growth Rate

2. **Calculations**:
   - 5-year earnings projections with present values
   - Terminal value calculation
   - Total DCF value
   - Value breakdown analysis

3. **Results Display**:
   - Summary cards with key metrics
   - Detailed yearly projections table
   - Terminal value analysis
   - Visual breakdown with progress bars

## Original DCF Logic
The core calculation logic is preserved from the original `dcf.py` script, ensuring accuracy and consistency with the command-line version.