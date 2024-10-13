import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Monitoring = () => {
  const [realtimeData, setRealtimeData] = useState({
    labels: [],
    datasets: [
      {
        label: 'BTC/USDT',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    // Simulating real-time data updates
    const interval = setInterval(() => {
      const newLabel = new Date().toLocaleTimeString();
      const newPrice = Math.random() * 1000 + 30000; // Random BTC price between 30000 and 31000
      
      setRealtimeData(prevData => ({
        labels: [...prevData.labels, newLabel].slice(-20), // Keep only last 20 data points
        datasets: [{
          ...prevData.datasets[0],
          data: [...prevData.datasets[0].data, newPrice].slice(-20),
        }],
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Real-time Price Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Real-time Monitoring</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <Line data={realtimeData} options={options} />
      </div>
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">System Logs</h2>
        <div className="bg-gray-100 p-4 rounded h-64 overflow-y-auto">
          <p className="text-sm text-gray-600">2023-03-15 12:00:01 - Strategy 1 executed buy order for BTC/USDT</p>
          <p className="text-sm text-gray-600">2023-03-15 12:00:05 - Strategy 2 executed sell order for ETH/USDT</p>
          {/* Add more log entries here */}
        </div>
      </div>
    </div>
  );
};

export default Monitoring;