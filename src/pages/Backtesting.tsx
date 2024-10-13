import React, { useState } from 'react';
import Select from 'react-select';

const Backtesting = () => {
  const [assets, setAssets] = useState([]);
  const [timeframes, setTimeframes] = useState([]);
  const [strategy, setStrategy] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const assetOptions = [
    { value: 'BTC', label: 'Bitcoin' },
    { value: 'ETH', label: 'Ethereum' },
    { value: 'XRP', label: 'Ripple' },
    // Add more assets as needed
  ];

  const timeframeOptions = [
    { value: '1m', label: '1 minute' },
    { value: '5m', label: '5 minutes' },
    { value: '15m', label: '15 minutes' },
    { value: '1h', label: '1 hour' },
    { value: '4h', label: '4 hours' },
    { value: '1d', label: '1 day' },
  ];

  const strategyOptions = [
    { value: 'moving_average_crossover', label: 'Moving Average Crossover' },
    { value: 'rsi_overbought_oversold', label: 'RSI Overbought/Oversold' },
    { value: 'bollinger_bands', label: 'Bollinger Bands' },
    // Add more strategies as needed
  ];

  const handleBacktest = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call your backtesting API
    console.log('Running backtest with:', { assets, timeframes, strategy, startDate, endDate });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Backtesting</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleBacktest} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Assets</label>
            <Select
              isMulti
              options={assetOptions}
              onChange={(selected) => setAssets(selected.map(option => option.value))}
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Timeframes</label>
            <Select
              isMulti
              options={timeframeOptions}
              onChange={(selected) => setTimeframes(selected.map(option => option.value))}
              className="mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Strategy</label>
            <Select
              options={strategyOptions}
              onChange={(selected) => setStrategy(selected ? selected.value : '')}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Run Backtest
          </button>
        </form>
      </div>
    </div>
  );
};

export default Backtesting;