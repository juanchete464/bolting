import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Results = () => {
  const [selectedMetric, setSelectedMetric] = useState('cumulative_returns');

  // Mock data for the chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Strategy Performance',
        data: [0, 10, 5, 15, 10, 20],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Backtest Results',
      },
    },
  };

  const metrics = [
    { id: 'cumulative_returns', name: 'Cumulative Returns' },
    { id: 'sharpe_ratio', name: 'Sharpe Ratio' },
    { id: 'max_drawdown', name: 'Max Drawdown' },
    { id: 'win_rate', name: 'Win Rate' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Backtest Results</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="metric" className="block text-sm font-medium text-gray-700">Select Metric</label>
          <select
            id="metric"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {metrics.map((metric) => (
              <option key={metric.id} value={metric.id}>{metric.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <Line options={options} data={chartData} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.id} className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{metric.name}</h3>
              <p className="text-2xl font-bold text-indigo-600">
                {metric.id === 'cumulative_returns' && '20%'}
                {metric.id === 'sharpe_ratio' && '1.5'}
                {metric.id === 'max_drawdown' && '-15%'}
                {metric.id === 'win_rate' && '60%'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;