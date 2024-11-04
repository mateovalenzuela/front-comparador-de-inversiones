import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const InvestmentResults = ({ resultsMoneyMarket, resultsFixedInvest, resultsFixedInvestWithReinvest }) => {
  if (!resultsMoneyMarket || resultsMoneyMarket.length === 0) {
    return <p>No hay datos para mostrar.</p>;
  }

  // Preparar los datos para el gráfico
  const labels = resultsMoneyMarket.map((item) => item.month);
  const fixedData = resultsFixedInvest.map((item) => item.amount);
  const compoundData = resultsMoneyMarket.map((item) => item.amount);
  const fixedWithReinvestData = resultsFixedInvestWithReinvest.map((item) => item.amount);

  const data = {
    labels,
    datasets: [
      {
        label: 'Plazo Fijo Anual',
        data: fixedData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0,
      },
      {
        label: 'Plazo Fijo Mensual',
        data: fixedWithReinvestData,
        borderColor: 'rgb(75,149,56)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: 'Interés Compuesto',
        data: compoundData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Mes (desde la inversión)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Monto ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
      <div className="bg-white p-6 rounded-md shadow-lg mt-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Resultados de Inversiones</h2>

        <div className="mb-4">
          <Line data={data} options={options}/>
        </div>

        <div className="pt-4">
          <h2 className="text-lg text-center font-semibold text-gray-700">Resumen:</h2>

            {/* Interés Compuesto */}
            {compoundData && compoundData.length > 0 && (
                <div className="mt-2 p-2">
                  <h4 className="font-semibold text-gray-800 py-2">Interés Compuesto:</h4>
                  <ul className="ml-4 list-disc">
                    <li>Importe Inicial: ${compoundData[0]}</li>
                    <li>Importe Final: ${compoundData[compoundData.length - 1]}</li>
                    <li>Rendimiento: {((compoundData[compoundData.length - 1] / compoundData[0] - 1) * 100).toFixed(2)}%</li>
                  </ul>
                </div>
            )}

            {/* Plazo Fijo con Reinversión */}
            {fixedWithReinvestData && fixedWithReinvestData.length > 0 && (
                <div className="mt-2 p-2">
                  <h4 className="font-semibold text-gray-800 py-2">Plazo Fijo Mensual:</h4>
                  <ul className="ml-4 list-disc">
                    <li>Importe Inicial: ${fixedWithReinvestData[0]}</li>
                    <li>Importe Final: ${fixedWithReinvestData[fixedWithReinvestData.length - 1]}</li>
                    <li>Rendimiento: {((fixedWithReinvestData[fixedWithReinvestData.length - 1] / fixedWithReinvestData[0] - 1) * 100).toFixed(2)}%</li>
                  </ul>
                </div>
            )}

            {/* Plazo Fijo sin Reinversión */}
            {fixedData && fixedData.length > 0 && (
                <div className="mt-2 p-2">
                  <h4 className="font-semibold text-gray-800 py-2">Plazo Fijo Anual:</h4>
                  <ul className="ml-4 list-disc">
                    <li>Importe Inicial: ${fixedData[0]}</li>
                    <li>Importe Final: ${fixedData[fixedData.length - 1]}</li>
                    <li>Rendimiento: {((fixedData[fixedData.length - 1] / fixedData[0] - 1) * 100).toFixed(2)}%</li>
                  </ul>
                </div>
            )}
        </div>
      </div>
  );
};

export default InvestmentResults;
