import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Activity, Code, Database, PieChart } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <h1 className="text-2xl font-semibold text-center">Backtesting Platform</h1>
      <nav>
        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <BarChart2 className="inline-block mr-2" size={20} />
          Dashboard
        </Link>
        <Link to="/backtesting" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <Activity className="inline-block mr-2" size={20} />
          Backtesting
        </Link>
        <Link to="/strategy-builder" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <Code className="inline-block mr-2" size={20} />
          Strategy Builder
        </Link>
        <Link to="/data-management" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <Database className="inline-block mr-2" size={20} />
          Data Management
        </Link>
        <Link to="/results" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
          <PieChart className="inline-block mr-2" size={20} />
          Results
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;