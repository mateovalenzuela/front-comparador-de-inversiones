import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const InvestmentResults = ({ resultsMoneyMarket, resultsFixedInvest, resultsFixedInvestWithReinvest }) => {
  // Si no hay datos en ninguna inversión, mostrar un mensaje
  if ((!resultsMoneyMarket || resultsMoneyMarket.length === 0)
      && (!resultsFixedInvest || resultsFixedInvest.length === 0)
      && (!resultsFixedInvestWithReinvest || resultsFixedInvestWithReinvest.length === 0))
  {
    return <p>No hay datos para mostrar.</p>;
  }

  // Definir etiquetas basadas en la primera inversión que tiene datos
  const labels =
    resultsMoneyMarket.length > 0 ? resultsMoneyMarket.map((item) => item.month) :
    resultsFixedInvest.length > 0 ? resultsFixedInvest.map((item) => item.month) :
    resultsFixedInvestWithReinvest.map((item) => item.month);

  // Preparar los datasets solo si contienen datos
  const datasets = [];

  if (resultsFixedInvest.length > 0) {
    datasets.push({
      label: 'Plazo Fijo Anual',
      data: resultsFixedInvest.map((item) => item.amount),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 2,
      tension: 0,
    });
  }

  if (resultsFixedInvestWithReinvest.length > 0) {
    datasets.push({
      label: 'Plazo Fijo Mensual',
      data: resultsFixedInvestWithReinvest.map((item) => item.amount),
      borderColor: 'rgb(75,149,56)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 2,
      tension: 0.3,
    });
  }

  if (resultsMoneyMarket.length > 0) {
    datasets.push({
      label: 'Interés Compuesto',
      data: resultsMoneyMarket.map((item) => item.amount),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderWidth: 2,
      tension: 0.3,
    });
  }

  const data = { labels, datasets };

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
        {resultsMoneyMarket.length > 0 && (
          <div className="mt-2 p-2">
            <h4 className="font-semibold text-gray-800 py-2">Interés Compuesto:</h4>
            <ul className="ml-4 list-disc">
              <li>Importe Inicial: ${resultsMoneyMarket[0].amount}</li>
              <li>Importe Final: ${resultsMoneyMarket[resultsMoneyMarket.length - 1].amount}</li>
              <li>Rendimiento: {((resultsMoneyMarket[resultsMoneyMarket.length - 1].amount / resultsMoneyMarket[0].amount - 1) * 100).toFixed(2)}%</li>
            </ul>
          </div>
        )}

        {/* Plazo Fijo con Reinversión */}
        {resultsFixedInvestWithReinvest.length > 0 && (
          <div className="mt-2 p-2">
            <h4 className="font-semibold text-gray-800 py-2">Plazo Fijo Mensual:</h4>
            <ul className="ml-4 list-disc">
              <li>Importe Inicial: ${resultsFixedInvestWithReinvest[0].amount}</li>
              <li>Importe Final: ${resultsFixedInvestWithReinvest[resultsFixedInvestWithReinvest.length - 1].amount}</li>
              <li>Rendimiento: {((resultsFixedInvestWithReinvest[resultsFixedInvestWithReinvest.length - 1].amount / resultsFixedInvestWithReinvest[0].amount - 1) * 100).toFixed(2)}%</li>
            </ul>
          </div>
        )}

        {/* Plazo Fijo sin Reinversión */}
        {resultsFixedInvest.length > 0 && (
          <div className="mt-2 p-2">
            <h4 className="font-semibold text-gray-800 py-2">Plazo Fijo Anual:</h4>
            <ul className="ml-4 list-disc">
              <li>Importe Inicial: ${resultsFixedInvest[0].amount}</li>
              <li>Importe Final: ${resultsFixedInvest[resultsFixedInvest.length - 1].amount}</li>
              <li>Rendimiento: {((resultsFixedInvest[resultsFixedInvest.length - 1].amount / resultsFixedInvest[0].amount - 1) * 100).toFixed(2)}%</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentResults;

