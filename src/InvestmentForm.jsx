import React, {useEffect, useState} from 'react';
import ToggleSwitch from './ToggleSwitch';


const InvestForm = ({ onCalculateMoneyMarket, onCalculateFixedInvest, onCalculateFixedInvestWithReinvest,
                      setResultCompoundInvestment, setResultFixedInvestment, setResultInvestWithReinvest }) => {
  const [amount, setAmount] = useState('')
  const [monthsDuration, setMonthsDuration] = useState('')
  const [fixedInvestment, setFixedInvestment] = useState({
    amount: amount,
    interest_rate: '',
    months_duration: monthsDuration,
  });

  const [fixedInvestmentWithReinvestment, setFixedInvestmentWithReinvestment] = useState({
    amount: amount,
    interest_rate: '',
    months_duration: monthsDuration,
  });

  const [compoundInvestment, setCompoundInvestment] = useState({
    amount: amount,
    interest_rate: '',
    months_duration: monthsDuration,
  });

  const [showCompoundInvstment, setShowCompoundInvestment] = useState(false)
  const [showFixedInvest, setShowFixedInvest] = useState(false)
  const [showFixedInvestWithReinvest, setShowFixedInvestWithReinvest] = useState(false)
  const [allowSubmit, setAllowSubmit] = useState(false)


  useEffect(() => {
    setFixedInvestment((prev) => ({
      ...prev,
      amount: amount,
      months_duration: monthsDuration,
    }));

    setFixedInvestmentWithReinvestment((prev) => ({
      ...prev,
      amount: amount,
      months_duration: monthsDuration,
    }));

    setCompoundInvestment((prev) => ({
      ...prev,
      amount: amount,
      months_duration: monthsDuration,
    }));

  }, [amount, monthsDuration]);

  useEffect(() => {
    if (!allowSubmit){
      setAllowSubmit(true)
    }
  }, [compoundInvestment, fixedInvestmentWithReinvestment, fixedInvestment]);


  useEffect(() => {
    if (showCompoundInvstment || showFixedInvest || showFixedInvest){
      setAllowSubmit(true)
    }

  }, [showCompoundInvstment, showFixedInvest, showFixedInvestWithReinvest]);


  const handleToggleCompoundInvestChange = (checked) => {
    setShowCompoundInvestment(checked);
  }

  const handleToggleFixedInvestChange = (checked) => {
        setShowFixedInvest(checked);
  };
  const handleToggleFixedInvestWithReinvestChange = (checked) => {
        setShowFixedInvestWithReinvest(checked);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allowSubmit)
      return;

    if (showCompoundInvstment && compoundInvestment.interest_rate) {
      onCalculateMoneyMarket(compoundInvestment);
    }

    if (showFixedInvest && fixedInvestment.interest_rate) {
      onCalculateFixedInvest(fixedInvestment);
    }
    if(showFixedInvestWithReinvest && fixedInvestmentWithReinvestment.interest_rate){
      onCalculateFixedInvestWithReinvest(fixedInvestmentWithReinvestment);
    }

    setAllowSubmit(false);
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
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ej. 10000"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duración en Meses</label>
            <input
                type="number"
                name="months_duration"
                value={monthsDuration}
                onChange={(e) => setMonthsDuration(e.target.value)}
                placeholder="Ej. 12"
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        {/*Inversión con interes compuesto */}
        <div className="space-y-4">
          <div className="">
            <ToggleSwitch
                label="Cargar inversión con interes compuesto (capitalización diaria de intereses)"
                onChange={handleToggleCompoundInvestChange}
                setResult={setResultCompoundInvestment}
            />
          </div>
          {showCompoundInvstment && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Tasa de Interés Anual (%)</label>
                <input
                    type="number"
                    name="interest_rate"
                    value={compoundInvestment.interest_rate}
                    onChange={(e) => setCompoundInvestment({...compoundInvestment, interest_rate: e.target.value})}
                    placeholder="Ej. 5"
                    required
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
          )}
        </div>

        {/*Inversión a plazo fijo sin reinvertir los intereses */}
        <div className="space-y-4">
          <div>
            <ToggleSwitch
                label="Cargar inversión a plazo fijo (capitalización anual de intereses)"
                onChange={handleToggleFixedInvestChange}
                setResult={setResultFixedInvestment}
            />
          </div>
          {showFixedInvest && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Tasa de Interés Anual del plazo fijo
                  (%)</label>
                <input
                    type="number"
                    name="interest_rate"
                    value={fixedInvestment.interest_rate}
                    onChange={(e) => setFixedInvestment({...fixedInvestment, interest_rate: e.target.value})}
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
                label="Cargar inversión a plazo fijo (capitalización mensual de intereses)"
                onChange={handleToggleFixedInvestWithReinvestChange}
                setResult={setResultInvestWithReinvest}
            />
          </div>
          {showFixedInvestWithReinvest && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Tasa de Interés Anual del plazo fijo (%)</label>
                <input
                    type="number"
                    name="interest_rate"
                    value={fixedInvestmentWithReinvestment.interest_rate}
                    onChange={(e) => setFixedInvestmentWithReinvestment({...fixedInvestmentWithReinvestment, interest_rate: e.target.value})}
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

