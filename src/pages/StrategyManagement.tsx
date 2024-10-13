import React, { useState } from 'react';

const StrategyManagement = () => {
  const [strategies, setStrategies] = useState([
    { id: 1, name: 'Strategy 1', status: 'active' },
    { id: 2, name: 'Strategy 2', status: 'inactive' },
    { id: 3, name: 'Strategy 3', status: 'active' },
  ]);

  const toggleStrategyStatus = (id: number) => {
    setStrategies(strategies.map(strategy => 
      strategy.id === id 
        ? { ...strategy, status: strategy.status === 'active' ? 'inactive' : 'active' }
        : strategy
    ));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Strategy Management</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Active Strategies</h2>
        <div className="space-y-4">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="flex items-center justify-between p-4 border rounded">
              <span className="font-medium">{strategy.name}</span>
              <div>
                <span className={`px-2 py-1 rounded text-sm mr-2 ${strategy.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {strategy.status}
                </span>
                <button
                  onClick={() => toggleStrategyStatus(strategy.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {strategy.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add New Strategy
        </button>
      </div>
    </div>
  );
};

export default StrategyManagement;