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

  function formatNumber(num) {
  return num.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

  return (
  <div className="bg-white py-8 rounded-xl shadow-2xl mt-8 max-w-3xl mx-auto">
    <h2 className="text-3xl pr-8 pl-8 font-bold text-center text-indigo-700 mb-6">Resultados de Inversiones</h2>

    {/* Gráfico de Resultados */}
    <div className=" pr-1 pl-1 md:p-8">
      <Line
        data={data}
        options={{
          ...options,
          responsive: true,
          maintainAspectRatio: false,
        }}
        className="w-full h-64 sm:h-80"
      />
    </div>

    {/* Resumen de Inversiones */}
    <div className="p-8">
      <h2 className="text-xl font-semibold text-center text-indigo-600 mb-4">Resumen</h2>

      {/* Interés Compuesto */}
      {resultsMoneyMarket.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-indigo-200 shadow-sm">
          <h4 className="text-lg font-semibold text-indigo-700 mb-3">Interés Compuesto</h4>
          <ul className="ml-5 space-y-2 text-gray-800 list-disc">
            <li><strong>Capital Inicial:</strong> ${formatNumber(resultsMoneyMarket[0].amount)}</li>
            <li><strong>Capital Final:</strong> ${formatNumber(resultsMoneyMarket[resultsMoneyMarket.length - 1].amount)}</li>
            <li><strong>Rendimiento:</strong> {((resultsMoneyMarket[resultsMoneyMarket.length - 1].amount / resultsMoneyMarket[0].amount - 1) * 100).toFixed(2)}%</li>
          </ul>
        </div>
      )}

      {/* Plazo Fijo con Reinversión */}
      {resultsFixedInvestWithReinvest.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-indigo-200 shadow-sm">
          <h4 className="text-lg font-semibold text-indigo-700 mb-3">Plazo Fijo Mensual</h4>
          <ul className="ml-5 space-y-2 text-gray-800 list-disc">
            <li><strong>Capital Inicial:</strong> ${formatNumber(resultsFixedInvestWithReinvest[0].amount)}</li>
            <li><strong>Capital Final:</strong> ${formatNumber(resultsFixedInvestWithReinvest[resultsFixedInvestWithReinvest.length - 1].amount)}</li>
            <li><strong>Rendimiento:</strong> {((resultsFixedInvestWithReinvest[resultsFixedInvestWithReinvest.length - 1].amount / resultsFixedInvestWithReinvest[0].amount - 1) * 100).toFixed(2)}%</li>
          </ul>
        </div>
      )}

      {/* Plazo Fijo sin Reinversión */}
      {resultsFixedInvest.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-indigo-200 shadow-sm">
          <h4 className="text-lg font-semibold text-indigo-700 mb-3">Plazo Fijo Anual</h4>
          <ul className="ml-5 space-y-2 text-gray-800 list-disc">
            <li><strong>Capital Inicial:</strong> ${formatNumber(resultsFixedInvest[0].amount)}</li>
            <li><strong>Capital Final:</strong> ${formatNumber(resultsFixedInvest[resultsFixedInvest.length - 1].amount)}</li>
            <li><strong>Rendimiento:</strong> {((resultsFixedInvest[resultsFixedInvest.length - 1].amount / resultsFixedInvest[0].amount - 1) * 100).toFixed(2)}%</li>
          </ul>
        </div>
      )}
    </div>
  </div>
);

};

export default InvestmentResults;

