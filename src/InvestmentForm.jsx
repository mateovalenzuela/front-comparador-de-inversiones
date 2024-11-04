import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';


const InvestForm = ({ onCalculateMoneyMarket, onCalculateFixedInvest, onCalculateFixedInvestWithReinvest }) => {
  const [fixedInvestment, setFixedInvestment] = useState({
    amount: '',
    interest_rate: '',
    months_duration: '',
  });

  const [fixedInvestmentWithReinvestment, setFixedInvestmentWithReinvestment] = useState({
    amount: '',
    interest_rate: '',
    months_duration: '',
  });

  const [compoundInvestment, setCompoundInvestment] = useState({
    amount: '',
    interest_rate: '',
    months_duration: '',
  });

  const [showFixedInvest, setShowFixedInvest] = useState(false)
  const [showFixedInvestWithReinvest, setShowFixedInvestWithReinvest] = useState(false)


  const handleInterestRateChange = (e) => {
    setCompoundInvestment({ ...compoundInvestment, interest_rate: e.target.value });
  };

  const handlePrincipalChange = (e) => {
    setCompoundInvestment({...compoundInvestment, amount: e.target.value})
    setFixedInvestment({...fixedInvestment, amount: e.target.value})
    setFixedInvestmentWithReinvestment({...fixedInvestmentWithReinvestment, amount: e.target.value})
  }

  const handleMonthsDurationChange = (e) => {
    setCompoundInvestment({...compoundInvestment, months_duration: e.target.value})
    setFixedInvestment({...fixedInvestment, months_duration: e.target.value})
    setFixedInvestmentWithReinvestment({...fixedInvestmentWithReinvestment, months_duration: e.target.value})
  }

  const handleInterestRateFixedInvestChange = (e) => {
    const { name, value } = e.target;
    setFixedInvestment({...fixedInvestment, [name]: value});
  }

  const handleInterestRateFixedInvestWithReinvestChange = (e) => {
    const { name, value } = e.target;
    setFixedInvestmentWithReinvestment({...fixedInvestmentWithReinvestment, [name]: value});
  }

  const handleToggleFixedInvestChange = (checked) => {
        setShowFixedInvest(checked);
  };
  const handleToggleFixedInvestWithReinvestChange = (checked) => {
        setShowFixedInvestWithReinvest(checked);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculateMoneyMarket(compoundInvestment);
    if (showFixedInvest) {
      onCalculateFixedInvest(fixedInvestment);
    }
    if(showFixedInvestWithReinvest){
      onCalculateFixedInvestWithReinvest(fixedInvestmentWithReinvestment);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Comparar Inversiones</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">


        {/* Inversión Interés Compuesto */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Inversión Interés Compuesto</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Capital Inicial ($)</label>
            <input
                type="number"
                name="principal"
                value={compoundInvestment.amount}
                onChange={handlePrincipalChange}
                placeholder="Ej. 10000"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tasa de Interés Anual (%)</label>
            <input
                type="number"
                name="interest_rate"
                value={compoundInvestment.interest_rate}
                onChange={handleInterestRateChange}
                placeholder="Ej. 5"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duración en Meses</label>
            <input
                type="number"
                name="months_duration"
                value={compoundInvestment.months_duration}
                onChange={handleMonthsDurationChange}
                placeholder="Ej. 12"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        {}

        {/*Inversión a plazo fijo sin reinvertir los intereses */}
        <div className="space-y-4">
          <div>
            <ToggleSwitch
                label="Cargar inversión a plazo fijo (sin reinversión de intereses)"
                onChange={handleToggleFixedInvestChange}
            />
          </div>
          {showFixedInvest && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Tasa de Interés Anual del plazo fijo (%)</label>
                <input
                    type="number"
                    name="interest_rate"
                    value={fixedInvestment.interest_rate}
                    onChange={handleInterestRateFixedInvestChange}
                    placeholder="Ej. 5"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
          )}
        </div>


        {/*Inversión a plazo fijo reinvirtiendo los intereses */}
        <div className="space-y-4">
          <div>
            <ToggleSwitch
                label="Cargar inversión a plazo fijo con reinversión de intereses"
                onChange={handleToggleFixedInvestWithReinvestChange}
            />
          </div>
          {showFixedInvestWithReinvest && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Tasa de Interés Anual del plazo fijo (%)</label>
                <input
                    type="number"
                    name="interest_rate"
                    value={fixedInvestmentWithReinvestment.interest_rate}
                    onChange={handleInterestRateFixedInvestWithReinvestChange}
                    placeholder="Ej. 5"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
          )}
        </div>

        {/* Botón de envío en una fila completa */}
        <div className="md:col-span-2">
          <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
          >
            Calcular Inversiones
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvestForm;

