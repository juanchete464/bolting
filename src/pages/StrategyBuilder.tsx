import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const StrategyBuilder = () => {
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [customCode, setCustomCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [timeframe, setTimeframe] = useState('5m');

  const indicatorOptions = [
    { value: 'SMA', label: 'Simple Moving Average', params: [{ name: 'period', default: 14 }] },
    { value: 'EMA', label: 'Exponential Moving Average', params: [{ name: 'period', default: 12 }] },
    { value: 'RSI', label: 'Relative Strength Index', params: [{ name: 'period', default: 14 }] },
    { value: 'MACD', label: 'Moving Average Convergence Divergence', params: [
      { name: 'fast_period', default: 12 },
      { name: 'slow_period', default: 26 },
      { name: 'signal_period', default: 9 }
    ]},
    { value: 'BB', label: 'Bollinger Bands', params: [
      { name: 'period', default: 20 },
      { name: 'std_dev', default: 2 }
    ]},
  ];

  const timeframeOptions = [
    { value: '1m', label: '1 minute' },
    { value: '5m', label: '5 minutes' },
    { value: '15m', label: '15 minutes' },
    { value: '1h', label: '1 hour' },
    { value: '4h', label: '4 hours' },
    { value: '1d', label: '1 day' },
  ];

  const handleIndicatorChange = (selected) => {
    const updatedIndicators = selected.map(indicator => ({
      ...indicator,
      params: indicator.params.map(param => ({ ...param, value: param.default }))
    }));
    setSelectedIndicators(updatedIndicators);
  };

  const handleParamChange = (indicatorIndex, paramName, value) => {
    const updatedIndicators = [...selectedIndicators];
    const paramIndex = updatedIndicators[indicatorIndex].params.findIndex(p => p.name === paramName);
    updatedIndicators[indicatorIndex].params[paramIndex].value = value;
    setSelectedIndicators(updatedIndicators);
  };

  const generatePythonCode = () => {
    let code = `
from freqtrade.strategy import IStrategy, merge_informative_pair
from pandas import DataFrame
import talib.abstract as ta
import pandas_ta as pta

class CustomStrategy(IStrategy):
    timeframe = '${timeframe}'

    def informative_pairs(self):
        return []

    def populate_indicators(self, dataframe: DataFrame, metadata: dict) -> DataFrame:
`;

    selectedIndicators.forEach(indicator => {
      switch (indicator.value) {
        case 'SMA':
          code += `        dataframe['sma_${indicator.params[0].value}'] = ta.SMA(dataframe, timeperiod=${indicator.params[0].value})\n`;
          break;
        case 'EMA':
          code += `        dataframe['ema_${indicator.params[0].value}'] = ta.EMA(dataframe, timeperiod=${indicator.params[0].value})\n`;
          break;
        case 'RSI':
          code += `        dataframe['rsi_${indicator.params[0].value}'] = ta.RSI(dataframe, timeperiod=${indicator.params[0].value})\n`;
          break;
        case 'MACD':
          code += `        macd = ta.MACD(dataframe, fastperiod=${indicator.params[0].value}, slowperiod=${indicator.params[1].value}, signalperiod=${indicator.params[2].value})\n`;
          code += `        dataframe['macd'] = macd['macd']\n`;
          code += `        dataframe['macdsignal'] = macd['macdsignal']\n`;
          code += `        dataframe['macdhist'] = macd['macdhist']\n`;
          break;
        case 'BB':
          code += `        bollinger = pta.bbands(dataframe['close'], length=${indicator.params[0].value}, std=${indicator.params[1].value})\n`;
          code += `        dataframe['bb_lowerband'] = bollinger['BBL_${indicator.params[0].value}_${indicator.params[1].value}']\n`;
          code += `        dataframe['bb_middleband'] = bollinger['BBM_${indicator.params[0].value}_${indicator.params[1].value}']\n`;
          code += `        dataframe['bb_upperband'] = bollinger['BBU_${indicator.params[0].value}_${indicator.params[1].value}']\n`;
          break;
      }
    });

    code += `
        return dataframe

    def populate_entry_trend(self, dataframe: DataFrame, metadata: dict) -> DataFrame:
        dataframe.loc[
            (
                # Your entry conditions here
                (dataframe['volume'] > 0)
            ),
            ['enter_long', 'enter_tag']] = (1, 'custom_entry')
        return dataframe

    def populate_exit_trend(self, dataframe: DataFrame, metadata: dict) -> DataFrame:
        dataframe.loc[
            (
                # Your exit conditions here
                (dataframe['volume'] > 0)
            ),
            ['exit_long', 'exit_tag']] = (1, 'custom_exit')
        return dataframe
`;

    setGeneratedCode(code);
  };

  useEffect(() => {
    generatePythonCode();
  }, [selectedIndicators, timeframe]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Strategy Builder</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Timeframe</label>
          <Select
            options={timeframeOptions}
            onChange={(selected) => setTimeframe(selected.value)}
            defaultValue={timeframeOptions.find(option => option.value === timeframe)}
            className="mb-4"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Indicators</label>
          <Select
            isMulti
            options={indicatorOptions}
            onChange={handleIndicatorChange}
            className="mb-4"
          />
        </div>
        {selectedIndicators.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Indicator Parameters</h3>
            {selectedIndicators.map((indicator, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <h4 className="font-medium mb-2">{indicator.label}</h4>
                {indicator.params.map((param) => (
                  <div key={param.name} className="flex items-center mb-2">
                    <label className="w-1/3">{param.name}:</label>
                    <input
                      type="number"
                      value={param.value}
                      onChange={(e) => handleParamChange(index, param.name, parseFloat(e.target.value))}
                      className="w-2/3 px-2 py-1 border rounded"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="generatedCode" className="block text-sm font-medium text-gray-700 mb-2">Generated Strategy Code</label>
          <textarea
            id="generatedCode"
            value={generatedCode}
            readOnly
            className="w-full h-64 p-2 border rounded-md font-mono text-sm bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="customCode" className="block text-sm font-medium text-gray-700 mb-2">Custom Strategy Code (Python)</label>
          <p className="text-sm text-gray-500 mb-2">
            Enter your custom strategy code here to override or extend the generated code.
          </p>
          <textarea
            id="customCode"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            className="w-full h-64 p-2 border rounded-md font-mono text-sm"
            placeholder="# Add your custom code here"
          />
        </div>
        <button
          onClick={generatePythonCode}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate Strategy Code
        </button>
      </div>
    </div>
  );
};

export default StrategyBuilder;