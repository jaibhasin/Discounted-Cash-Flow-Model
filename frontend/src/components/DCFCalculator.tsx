'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

interface DCFInput {
  current_earnings: number;
  discount_rate: number;
  growth_rate: number;
  terminal_growth: number;
}

interface YearlyProjection {
  year: number;
  future_earnings: number;
  present_value: number;
}

interface DCFResult {
  current_earnings: number;
  discount_rate: number;
  growth_rate: number;
  terminal_growth: number;
  yearly_projections: YearlyProjection[];
  year_6_earnings: number;
  terminal_value: number;
  pv_terminal_value: number;
  total_pv_5years: number;
  total_dcf_value: number;
  five_year_percentage: number;
  terminal_percentage: number;
}

export default function DCFCalculator() {
  const [inputs, setInputs] = useState<DCFInput>({
    current_earnings: 100000,
    discount_rate: 0.10,
    growth_rate: 0.08,
    terminal_growth: 0.03
  });

  const [result, setResult] = useState<DCFResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof DCFInput, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const calculateDCF = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/calculate-dcf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to calculate DCF');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (rate: number) => {
    return `${(rate * 100).toFixed(1)}%`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Calculator className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">DCF Calculator</h1>
        </div>
        <p className="text-gray-600">Calculate the intrinsic value of your investment using Discounted Cash Flow analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
            Input Parameters
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Year Owner Earnings (₹)
              </label>
              <input
                type="number"
                value={inputs.current_earnings}
                onChange={(e) => handleInputChange('current_earnings', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Rate (as decimal, e.g., 0.10 for 10%)
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.discount_rate}
                onChange={(e) => handleInputChange('discount_rate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Growth Rate for First 5 Years (as decimal, e.g., 0.08 for 8%)
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.growth_rate}
                onChange={(e) => handleInputChange('growth_rate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.08"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Terminal Growth Rate (as decimal, e.g., 0.03 for 3%)
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.terminal_growth}
                onChange={(e) => handleInputChange('terminal_growth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.03"
              />
            </div>
          </div>

          <button
            onClick={calculateDCF}
            disabled={loading}
            className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <TrendingUp className="w-5 h-5 mr-2" />
                Calculate DCF
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
              DCF Results
            </h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-4 text-white">
                <h3 className="text-sm font-medium opacity-90">Total DCF Value</h3>
                <p className="text-2xl font-bold">{formatCurrency(result.total_dcf_value)}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-4 text-white">
                <h3 className="text-sm font-medium opacity-90">Current Earnings</h3>
                <p className="text-2xl font-bold">{formatCurrency(result.current_earnings)}</p>
              </div>
            </div>

            {/* Input Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">Input Parameters</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Discount Rate:</span>
                  <span className="ml-2 font-medium">{formatPercentage(result.discount_rate)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Growth Rate:</span>
                  <span className="ml-2 font-medium">{formatPercentage(result.growth_rate)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Terminal Growth:</span>
                  <span className="ml-2 font-medium">{formatPercentage(result.terminal_growth)}</span>
                </div>
              </div>
            </div>

            {/* Yearly Projections */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">5-Year Projections</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Year</th>
                      <th className="text-right py-2">Future Earnings</th>
                      <th className="text-right py-2">Present Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearly_projections.map((projection) => (
                      <tr key={projection.year} className="border-b border-gray-100">
                        <td className="py-2 font-medium">{projection.year}</td>
                        <td className="py-2 text-right">{formatCurrency(projection.future_earnings)}</td>
                        <td className="py-2 text-right">{formatCurrency(projection.present_value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Terminal Value */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Terminal Value Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Year 6 Projected Earnings:</span>
                  <span className="font-medium">{formatCurrency(result.year_6_earnings)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Terminal Value:</span>
                  <span className="font-medium">{formatCurrency(result.terminal_value)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PV of Terminal Value:</span>
                  <span className="font-medium">{formatCurrency(result.pv_terminal_value)}</span>
                </div>
              </div>
            </div>

            {/* Value Breakdown */}
            <div>
              <h3 className="font-semibold mb-3">Value Breakdown</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>5-Year Period</span>
                    <span>{result.five_year_percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${result.five_year_percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatCurrency(result.total_pv_5years)}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Terminal Value</span>
                    <span>{result.terminal_percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${result.terminal_percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatCurrency(result.pv_terminal_value)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}