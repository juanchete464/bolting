import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Backtesting from './pages/Backtesting';
import StrategyBuilder from './pages/StrategyBuilder';
import DataManagement from './pages/DataManagement';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/backtesting" element={<Backtesting />} />
            <Route path="/strategy-builder" element={<StrategyBuilder />} />
            <Route path="/data-management" element={<DataManagement />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;