import React, { useState } from 'react';

const Optimization = () => {
  const [strategy, setStrategy] = useState('');
  const [optimizationTarget, setOptimizationTarget] = useState('');
  const [parameters, setParameters] = useState({
    param1: { min: 0, max: 100, step: 1 },
    param2: { min: 0, max: 100, step: 1 },
  });

  const handleOptimization = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call your optimization API
    console.log('Running optimization with:', { strategy, optimizationTarget, parameters });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Strategy Optimization</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleOptimization} className="space-y-4">
          <div>
            <label htmlFor="strategy" className="block text-sm font-medium text-gray-700">Strategy</label>
            <select
              id="strategy"
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select a strategy</option>
              <option value="strategy1">Strategy 1</option>
              <option value="strategy2">Strategy 2</option>
              <option value="strategy3">Strategy 3</option>
            </select>
          </div>
          <div>
            <label htmlFor="optimizationTarget" className="block text-sm font-medium text-gray-700">Optimization Target</label>
            <select
              id="optimizationTarget"
              value={optimizationTarget}
              onChange={(e) => setOptimizationTarget(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select optimization target</option>
              <option value="profit">Total Profit</option>
              <option value="sharpeRatio">Sharpe Ratio</option>
              <option value="drawdown">Minimize Drawdown</option>
            </select>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Parameters to Optimize</h3>
            {Object.entries(parameters).map(([param, values]) => (
              <div key={param} className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor={`${param}-min`} className="block text-sm font-medium text-gray-700">Min</label>
                  <input
                    type="number"
                    id={`${param}-min`}
                    value={values.min}
                    onChange={(e) => setParameters({...parameters, [param]: {...values, min: Number(e.target.value)}})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor={`${param}-max`} className="block text-sm font-medium text-gray-700">Max</label>
                  <input
                    type="number"
                    id={`${param}-max`}
                    value={values.max}
                    onChange={(e) => setParameters({...parameters, [param]: {...values, max: Number(e.target.value)}})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor={`${param}-step`} className="block text-sm font-medium text-gray-700">Step</label>
                  <input
                    type="number"
                    id={`${param}-step`}
                    value={values.step}
                    onChange={(e) => setParameters({...parameters, [param]: {...values, step: Number(e.target.value)}})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start Optimization
          </button>
        </form>
      </div>
      {/* Here you would add components to display optimization results */}
    </div>
  );
};

export default Optimization;