import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Code, Database, PieChart } from 'lucide-react';

const DashboardCard = ({ title, description, icon, link }) => (
  <Link to={link} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-xl font-semibold ml-2">{title}</h2>
    </div>
    <p className="text-gray-600">{description}</p>
  </Link>
);

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Backtesting"
          description="Run backtests on historical data to evaluate trading strategies."
          icon={<Activity size={24} className="text-blue-500" />}
          link="/backtesting"
        />
        <DashboardCard
          title="Strategy Builder"
          description="Create and customize trading strategies using various indicators."
          icon={<Code size={24} className="text-green-500" />}
          link="/strategy-builder"
        />
        <DashboardCard
          title="Data Management"
          description="Import and manage historical price data for backtesting."
          icon={<Database size={24} className="text-yellow-500" />}
          link="/data-management"
        />
        <DashboardCard
          title="Results"
          description="View and analyze the results of your backtests."
          icon={<PieChart size={24} className="text-purple-500" />}
          link="/results"
        />
      </div>
    </div>
  );
};

export default Dashboard;