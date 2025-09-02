# 💰 DCF Calculator Web Application

> A comprehensive, modern web application for Discounted Cash Flow (DCF) analysis to determine the intrinsic value of investments and companies.

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4+-38B2AC.svg)](https://tailwindcss.com)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Development](#development)
- [Usage Examples](#usage-examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The DCF Calculator is a sophisticated financial analysis tool that helps investors and analysts determine the intrinsic value of investments using the Discounted Cash Flow method. This application provides both a command-line interface (`dcf.py`) and a modern web interface with real-time calculations.

**Key Capabilities:**
- Calculate present value of future cash flows
- Project earnings over a 5-year period
- Compute terminal value with perpetual growth
- Provide detailed breakdown of value components
- Support multiple calculation scenarios

## ✨ Features

### 🧮 Core DCF Calculations
- **Multi-year Projections**: 5-year detailed cash flow projections
- **Terminal Value**: Perpetual growth model for long-term value
- **Present Value Analysis**: Discounted cash flow calculations
- **Value Breakdown**: Percentage contribution analysis

### 💻 Web Application Features
- **Interactive UI**: Modern, responsive design with Tailwind CSS
- **Real-time Validation**: Input validation and error handling
- **Visual Results**: Progress bars and detailed result tables
- **Mobile Responsive**: Optimized for all device sizes
- **Fast Performance**: Built with Next.js 15 and Turbopack

### 🔧 Technical Features
- **RESTful API**: FastAPI backend with comprehensive documentation
- **Type Safety**: Full TypeScript implementation
- **Input Validation**: Pydantic models for data validation
- **CORS Support**: Seamless frontend-backend integration
- **Error Handling**: Comprehensive error management

## 🛠 Technology Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.8+ | Core runtime environment |
| **FastAPI** | 0.104.1 | High-performance web framework |
| **Pydantic** | 2.5.0 | Data validation and serialization |
| **Uvicorn** | 0.24.0 | ASGI server |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.5.2 | React framework with SSR |
| **React** | 19.1.0 | UI component library |
| **TypeScript** | 5+ | Type-safe JavaScript |
| **Tailwind CSS** | 4+ | Utility-first CSS framework |
| **Lucide React** | 0.542.0 | Icon library |

## 🏗 Architecture

The application follows a modern full-stack architecture with clear separation of concerns:

```
┌─────────────────┐    HTTP/REST    ┌──────────────────┐
│   Frontend      │ ◄─────────────► │     Backend      │
│   (Next.js)     │                 │    (FastAPI)     │
│                 │                 │                  │
│ • React UI      │                 │ • REST API       │
│ • TypeScript    │                 │ • Data Models    │
│ • Tailwind CSS  │                 │ • Business Logic │
│ • Form Handling │                 │ • Validation     │
└─────────────────┘                 └──────────────────┘
      Port 3000                           Port 8000
```

### Backend Architecture (FastAPI)
- **Location**: `backend/`
- **Features**:
  - RESTful API endpoints for DCF calculations
  - Pydantic models for request/response validation
  - CORS middleware for cross-origin requests
  - Comprehensive error handling and logging
  - Auto-generated OpenAPI documentation

### Frontend Architecture (Next.js + Tailwind CSS)
- **Location**: `frontend/`
- **Features**:
  - Server-side rendering for optimal performance
  - Responsive design with mobile-first approach
  - Real-time form validation and user feedback
  - Interactive results visualization
  - Type-safe API integration

## 🚀 Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

| Requirement | Version | Download Link |
|-------------|---------|---------------|
| **Python** | 3.8 or higher | [python.org](https://python.org) |
| **Node.js** | 18 or higher | [nodejs.org](https://nodejs.org) |
| **npm** | Latest | Included with Node.js |

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/jaibhasin/Discounted-Cash-Flow-Model.git
   cd Discounted-Cash-Flow-Model
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   
   # Create virtual environment (recommended)
   python -m venv venv
   
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Start the API server
   python main.py
   ```
   
   The API will be available at `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`
   - Health Check: `http://localhost:8000/health`

3. **Set up the Frontend**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Start the development server
   npm run dev
   ```
   
   The web application will be available at `http://localhost:3000`

### Alternative: Command Line Version

For quick calculations, you can use the standalone Python script:

```bash
python dcf.py
```

This will run an interactive command-line version of the DCF calculator.

## 📚 API Documentation

The FastAPI backend provides a comprehensive REST API for DCF calculations. The API includes automatic documentation and validation.

### Base URL
- Development: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Alternative Documentation: `http://localhost:8000/redoc`

### Available Endpoints

#### `GET /`
Get API information and version.

**Response:**
```json
{
  "message": "DCF Calculator API",
  "version": "1.0.0"
}
```

#### `GET /health`
Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy"
}
```

#### `POST /calculate-dcf`
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

**Parameters:**
- `current_earnings` (float): Current year owner earnings (must be positive)
- `discount_rate` (float): Discount rate as decimal (0-1, e.g., 0.10 for 10%)
- `growth_rate` (float): Growth rate for first 5 years as decimal (0-1)
- `terminal_growth` (float): Terminal growth rate as decimal (0-1, must be < discount_rate)

**Response:**
```json
{
  "current_earnings": 100000.0,
  "discount_rate": 0.1,
  "growth_rate": 0.08,
  "terminal_growth": 0.03,
  "yearly_projections": [
    {
      "year": 1,
      "future_earnings": 108000.0,
      "present_value": 98181.82
    },
    // ... 4 more years
  ],
  "year_6_earnings": 158687.43,
  "terminal_value": 2266963.28,
  "pv_terminal_value": 1407881.65,
  "total_pv_5years": 431655.68,
  "total_dcf_value": 1839537.33,
  "five_year_percentage": 23.47,
  "terminal_percentage": 76.53
}
```

### Error Handling

The API provides detailed error messages for validation failures:

**400 Bad Request Example:**
```json
{
  "detail": "Discount rate must be greater than terminal growth rate"
}
```

**422 Validation Error Example:**
```json
{
  "detail": [
    {
      "loc": ["body", "current_earnings"],
      "msg": "Current earnings must be positive",
      "type": "value_error"
    }
  ]
}
```

## 📁 Project Structure

```
Discounted-Cash-Flow-Model/
├── 📁 backend/                 # FastAPI backend application
│   ├── main.py                # Main FastAPI application
│   └── requirements.txt       # Python dependencies
├── 📁 frontend/               # Next.js frontend application
│   ├── 📁 src/               # Source code
│   │   └── 📁 app/           # Next.js app directory
│   ├── 📁 public/            # Static assets
│   ├── package.json          # Node.js dependencies
│   ├── tsconfig.json         # TypeScript configuration
│   ├── next.config.ts        # Next.js configuration
│   ├── postcss.config.mjs    # PostCSS configuration
│   ├── eslint.config.mjs     # ESLint configuration
│   └── README.md             # Frontend-specific documentation
├── dcf.py                     # Standalone command-line calculator
├── README.md                  # Main project documentation
└── .gitignore                # Git ignore rules
```

### Key Files Description

- **`backend/main.py`**: FastAPI application with all API endpoints and business logic
- **`backend/requirements.txt`**: Python package dependencies (FastAPI, Uvicorn, Pydantic)
- **`frontend/src/app/`**: Next.js application pages and components
- **`frontend/package.json`**: Node.js dependencies and scripts
- **`dcf.py`**: Original command-line DCF calculator (standalone)

## 🔧 Development

### Development Workflow

1. **Backend Development**
   ```bash
   cd backend
   
   # Install dependencies in development mode
   pip install -r requirements.txt
   
   # Run with auto-reload for development
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Frontend Development**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Run development server with Turbopack
   npm run dev
   
   # Build for production
   npm run build
   
   # Run production server
   npm start
   
   # Lint code
   npm run lint
   ```

### Code Style and Standards

- **Python**: Follow PEP 8 guidelines
- **TypeScript/JavaScript**: ESLint configuration provided
- **Commit Messages**: Use conventional commit format

### Testing the Application

1. **Backend Testing**
   - API documentation available at `http://localhost:8000/docs`
   - Health check: `http://localhost:8000/health`
   - Test API endpoints using curl or Postman

2. **Frontend Testing**
   - Verify responsive design on different screen sizes
   - Test form validation with various inputs
   - Check API integration and error handling

## 💡 Usage Examples

### Example 1: Basic Company Valuation

**Input:**
- Current Earnings: ₹1,000,000
- Discount Rate: 12% (0.12)
- Growth Rate: 15% (0.15) for first 5 years
- Terminal Growth: 3% (0.03)

**Expected Output:**
- Higher growth rate leads to higher valuations
- Terminal value typically represents 70-80% of total value
- 5-year cash flows contribute 20-30% of total value

### Example 2: Conservative Analysis

**Input:**
- Current Earnings: ₹500,000
- Discount Rate: 10% (0.10)
- Growth Rate: 5% (0.05) for first 5 years
- Terminal Growth: 2% (0.02)

**Expected Output:**
- More conservative assumptions lead to lower valuations
- Better suited for mature, stable companies

### Command Line Usage

```bash
$ python dcf.py

=== DCF Calculator using Owner Earnings ===

Enter current year owner earnings (₹): 100000
Enter discount rate (r) as decimal (e.g., 0.10 for 10%): 0.10
Enter growth rate (g) for first 5 years as decimal (e.g., 0.08 for 8%): 0.08
Enter terminal growth rate (g_terminal) as decimal (e.g., 0.03 for 3%): 0.03

=== DCF Calculation ===
Current Owner Earnings: ₹100,000.00
Discount Rate: 10.00%
Growth Rate (Years 1-5): 8.00%
Terminal Growth Rate: 3.00%
...
```

## ❗ Troubleshooting

### Common Issues and Solutions

#### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'fastapi'`
```bash
# Solution: Install dependencies
cd backend
pip install -r requirements.txt
```

**Problem**: `Port 8000 already in use`
```bash
# Solution: Kill existing process or use different port
# Find process using port 8000
lsof -i :8000
kill -9 <PID>

# Or run on different port
uvicorn main:app --port 8001
```

**Problem**: CORS errors when accessing from frontend
```bash
# Solution: Ensure CORS middleware is properly configured
# Check that frontend URL is in allowed_origins in main.py
```

#### Frontend Issues

**Problem**: `npm ERR! peer dep missing`
```bash
# Solution: Install peer dependencies
npm install --legacy-peer-deps
```

**Problem**: TypeScript compilation errors
```bash
# Solution: Check TypeScript configuration
npm run build
# Fix any type errors shown
```

**Problem**: API connection refused
```bash
# Solution: Ensure backend is running
# Check if backend is accessible at http://localhost:8000/health
```

#### General Issues

**Problem**: Python version compatibility
```bash
# Solution: Use Python 3.8 or higher
python --version
# If version is lower, install Python 3.8+
```

**Problem**: Node.js version compatibility
```bash
# Solution: Use Node.js 18 or higher
node --version
# If version is lower, install Node.js 18+
```

### Performance Tips

1. **Backend Performance**
   - Use virtual environments to avoid package conflicts
   - Consider using Redis for caching frequent calculations
   - Monitor memory usage for large-scale deployments

2. **Frontend Performance**
   - Next.js automatically optimizes bundle sizes
   - Turbopack provides faster development builds
   - Consider implementing client-side caching for API responses

## 🤝 Contributing

We welcome contributions to improve the DCF Calculator! Here's how you can help:

### Ways to Contribute

1. **Bug Reports**: Open an issue with details about the bug
2. **Feature Requests**: Suggest new features or improvements
3. **Code Contributions**: Submit pull requests with improvements
4. **Documentation**: Help improve documentation and examples
5. **Testing**: Report compatibility issues or testing scenarios

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following the coding standards
4. Test your changes thoroughly
5. Submit a pull request with a clear description

### Pull Request Guidelines

- Include a clear description of changes
- Add tests for new functionality
- Update documentation as needed
- Ensure all existing tests pass
- Follow the established code style

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Author**: Jai Bhasin
- **Repository**: [github.com/jaibhasin/Discounted-Cash-Flow-Model](https://github.com/jaibhasin/Discounted-Cash-Flow-Model)
- **Issues**: [Report bugs or request features](https://github.com/jaibhasin/Discounted-Cash-Flow-Model/issues)

---

## 🙏 Acknowledgments

This project builds upon fundamental DCF analysis principles and provides a modern, accessible interface for financial calculations. Special thanks to the open-source community for the excellent frameworks and libraries that make this project possible.

**Built with ❤️ using FastAPI, Next.js, and modern web technologies.**