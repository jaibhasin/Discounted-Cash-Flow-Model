'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, BarChart3, Sparkles } from 'lucide-react';

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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Calculator className="w-10 h-10 text-blue-600 dark:text-blue-400 mr-3" />
            <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            DCF Calculator
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Calculate the intrinsic value of your investment using professional-grade 
          <span className="font-semibold text-blue-600 dark:text-blue-400"> Discounted Cash Flow analysis</span>
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
        {/* Input Form */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 transition-all duration-300 hover:shadow-2xl animate-fade-in">
          <h2 className="text-2xl font-semibold mb-8 flex items-center text-gray-800 dark:text-gray-200">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            Input Parameters
          </h2>

          <div className="space-y-6">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Current Year Owner Earnings (₹)
              </label>
              <input
                type="number"
                value={inputs.current_earnings}
                onChange={(e) => handleInputChange('current_earnings', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="100000"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Discount Rate <span className="text-gray-500 dark:text-gray-400">(as decimal, e.g., 0.10 for 10%)</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.discount_rate}
                onChange={(e) => handleInputChange('discount_rate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="0.10"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Growth Rate for First 5 Years <span className="text-gray-500 dark:text-gray-400">(as decimal, e.g., 0.08 for 8%)</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.growth_rate}
                onChange={(e) => handleInputChange('growth_rate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="0.08"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Terminal Growth Rate <span className="text-gray-500 dark:text-gray-400">(as decimal, e.g., 0.03 for 3%)</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.terminal_growth}
                onChange={(e) => handleInputChange('terminal_growth', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="0.03"
              />
            </div>
          </div>

          <button
            onClick={calculateDCF}
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Calculating...</span>
              </div>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                <span>Calculate DCF</span>
              </>
            )}
          </button>

          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl animate-fade-in">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 transition-all duration-300 hover:shadow-2xl animate-slide-in-right">
            <h2 className="text-2xl font-semibold mb-8 flex items-center text-gray-800 dark:text-gray-200">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              DCF Results
            </h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                <h3 className="text-sm font-medium opacity-90 mb-2">Total DCF Value</h3>
                <p className="text-3xl font-bold">{formatCurrency(result.total_dcf_value)}</p>
                <div className="mt-2 text-emerald-100 text-sm">Investment Valuation</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
                <h3 className="text-sm font-medium opacity-90 mb-2">Current Earnings</h3>
                <p className="text-3xl font-bold">{formatCurrency(result.current_earnings)}</p>
                <div className="mt-2 text-blue-100 text-sm">Base Year Earnings</div>
              </div>
            </div>

            {/* Input Summary */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Input Parameters</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400 text-sm block">Discount Rate</span>
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{formatPercentage(result.discount_rate)}</span>
                </div>
                <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400 text-sm block">Growth Rate</span>
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{formatPercentage(result.growth_rate)}</span>
                </div>
                <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
                  <span className="text-gray-600 dark:text-gray-400 text-sm block">Terminal Growth</span>
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{formatPercentage(result.terminal_growth)}</span>
                </div>
              </div>
            </div>

            {/* Yearly Projections */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200 text-lg">5-Year Projections</h3>
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-gray-600">
                      <th className="text-left py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Year</th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Future Earnings</th>
                      <th className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Present Value</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-800">
                    {result.yearly_projections.map((projection, index) => (
                      <tr key={projection.year} className={`border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-150 ${index % 2 === 0 ? '' : 'bg-gray-25 dark:bg-slate-750'}`}>
                        <td className="py-4 px-6 font-medium text-gray-800 dark:text-gray-200">{projection.year}</td>
                        <td className="py-4 px-6 text-right text-gray-700 dark:text-gray-300">{formatCurrency(projection.future_earnings)}</td>
                        <td className="py-4 px-6 text-right font-semibold text-gray-800 dark:text-gray-200">{formatCurrency(projection.present_value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Terminal Value */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200 text-lg">Terminal Value Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
                  <span className="text-purple-600 dark:text-purple-400 text-sm font-medium block mb-1">Year 6 Projected Earnings</span>
                  <span className="text-xl font-bold text-purple-800 dark:text-purple-300">{formatCurrency(result.year_6_earnings)}</span>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-700">
                  <span className="text-indigo-600 dark:text-indigo-400 text-sm font-medium block mb-1">Terminal Value</span>
                  <span className="text-xl font-bold text-indigo-800 dark:text-indigo-300">{formatCurrency(result.terminal_value)}</span>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 rounded-xl p-4 border border-cyan-200 dark:border-cyan-700">
                  <span className="text-cyan-600 dark:text-cyan-400 text-sm font-medium block mb-1">PV of Terminal Value</span>
                  <span className="text-xl font-bold text-cyan-800 dark:text-cyan-300">{formatCurrency(result.pv_terminal_value)}</span>
                </div>
              </div>
            </div>

            {/* Value Breakdown */}
            <div>
              <h3 className="font-semibold mb-6 text-gray-800 dark:text-gray-200 text-lg">Value Breakdown</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-gray-700 dark:text-gray-300">5-Year Period</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{result.five_year_percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${result.five_year_percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                    {formatCurrency(result.total_pv_5years)}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Terminal Value</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{result.terminal_percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${result.terminal_percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
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