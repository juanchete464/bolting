import React, { useEffect, useState } from 'react';
import { getStatus } from '../../api/freqtradeApi';

const ActiveStrategiesPanel = () => {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const status = await getStatus();
        setStrategies(status.running_trades || []);
        setLoading(false);
      } catch (err) {
        setError('No se pudo conectar con el servidor de Freqtrade');
        setLoading(false);
      }
    };

    fetchStrategies();
    const interval = setInterval(fetchStrategies, 30000); // Actualiza cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Cargando estrategias...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Estrategias Activas</h2>
      <div className="space-y-4">
        {strategies.length === 0 ? (
          <p>No hay estrategias activas en este momento o no se ha establecido conexión con Freqtrade.</p>
        ) : (
          strategies.map((strategy, index) => (
            <div key={index} className="border p-3 rounded">
              <div className="flex justify-between items-center">
                <span className="font-medium">{strategy.pair}</span>
                <span className={`px-2 py-1 rounded text-sm ${strategy.is_short ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                  {strategy.is_short ? 'Corto' : 'Largo'}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>Tasa de apertura: {strategy.open_rate}</p>
                <p>Tasa actual: {strategy.current_rate}</p>
                <p>Beneficio: {(strategy.profit_ratio * 100).toFixed(2)}%</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActiveStrategiesPanel;