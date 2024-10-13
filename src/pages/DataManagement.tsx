import React, { useState } from 'react';
import Select from 'react-select';

const DataManagement = () => {
  const [dataSource, setDataSource] = useState('');
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const dataSourceOptions = [
    { value: 'csv', label: 'CSV File' },
    { value: 'api', label: 'External API' },
    { value: 'database', label: 'Database' },
  ];

  const assetOptions = [
    { value: 'BTC', label: 'Bitcoin' },
    { value: 'ETH', label: 'Ethereum' },
    { value: 'XRP', label: 'Ripple' },
    // Add more assets as needed
  ];

  const handleImportData = () => {
    // Here you would typically handle the data import process
    console.log('Importing data:', { dataSource, selectedAssets, startDate, endDate });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Data Management</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Data Source</label>
          <Select
            options={dataSourceOptions}
            onChange={(selected) => setDataSource(selected ? selected.value : '')}
            className="mb-4"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Assets</label>
          <Select
            isMulti
            options={assetOptions}
            onChange={(selected) => setSelectedAssets(selected)}
            className="mb-4"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
            />
          </div>
        </div>
        <button
          onClick={handleImportData}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Import Data
        </button>
      </div>
    </div>
  );
};

export default DataManagement;