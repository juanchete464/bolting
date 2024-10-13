import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getProfit } from '../../api/freqtradeApi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PerformanceChartPanel = () => {
  const [profitData, setProfitData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Beneficio/Pérdida Acumulado',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfitData = async () => {
      try {
        const data = await getProfit();
        const labels = data.data.map(item => new Date(item.date).toLocaleDateString());
        const profits = data.data.map(item => item.cum_profit);
        
        setProfitData({
          labels,
          datasets: [
            {
              ...profitData.datasets[0],
              data: profits,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos de beneficios:', error);
        setError('No se pudo conectar con el servidor de Freqtrade');
        setLoading(false);
      }
    };

    fetchProfitData();
    const interval = setInterval(fetchProfitData, 300000); // Actualiza cada 5 minutos

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
        text: 'Rendimiento a lo largo del tiempo',
      },
    },
  };

  if (loading) return <div>Cargando datos de rendimiento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Gráfico de Rendimiento</h2>
      {profitData.labels.length > 0 ? (
        <Line data={profitData} options={options} />
      ) : (
        <p>No hay datos de rendimiento disponibles o no se ha establecido conexión con Freqtrade.</p>
      )}
    </div>
  );
};

export default PerformanceChartPanel;