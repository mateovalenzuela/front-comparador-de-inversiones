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
  const [displayAmount, setDisplayAmount] = useState("");



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

  // Función para formatear con puntos de miles
  const formatAmount = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Maneja el cambio de input
  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, ""); // elimina puntos para mantener el valor sin formato
    if (!isNaN(rawValue)) {
      setAmount(rawValue); // valor sin formato
      setDisplayAmount(formatAmount(rawValue)); // valor con formato
    }
  };

  // Quita el formato cuando el input pierde el foco
  const handleBlur = () => setDisplayAmount(formatAmount(amount));


  return (
  <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-3xl font-bold text-neutral-950 mb-8 text-center">Comparar Inversiones</h2>
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Inversión Interés Compuesto */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Capital Inicial ($)</label>
          <input
              type="text"
              name="principal"
              value={displayAmount}
              onChange={handleAmountChange}
              onBlur={handleBlur}
              placeholder="Ej. 10.000"
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
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
              max={120}
              min={1}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
          />
        </div>
      </div>

      {/* Inversión con interés compuesto */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <ToggleSwitch
              label="Cargar inversión con capitalización diaria de intereses"
              onChange={handleToggleCompoundInvestChange}
              setResult={setResultCompoundInvestment}
          />
        </div>
        {showCompoundInvstment && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Tasa de Interés Anual (TNA %)</label>
            <input
              type="number"
              name="interest_rate"
              value={compoundInvestment.interest_rate}
              onChange={(e) => setCompoundInvestment({ ...compoundInvestment, interest_rate: e.target.value })}
              placeholder="Ej. 5"
              required
              max={999}
              min={0}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
            />
          </div>
        )}
      </div>

      {/* Inversión a plazo fijo reinvirtiendo los intereses */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <ToggleSwitch
            label="Cargar inversión con capitalización mensual de intereses"
            onChange={handleToggleFixedInvestWithReinvestChange}
            setResult={setResultInvestWithReinvest}
          />
        </div>
        {showFixedInvestWithReinvest && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Tasa de Interés Anual (TNA %)</label>
            <input
              type="number"
              name="interest_rate"
              value={fixedInvestmentWithReinvestment.interest_rate}
              onChange={(e) =>
                setFixedInvestmentWithReinvestment({ ...fixedInvestmentWithReinvestment, interest_rate: e.target.value })
              }
              placeholder="Ej. 5"
              max={999}
              min={0}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
            />
          </div>
        )}
      </div>

      {/* Inversión a plazo fijo sin reinvertir los intereses */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <ToggleSwitch
            label="Cargar inversión con capitalización anual de intereses"
            onChange={handleToggleFixedInvestChange}
            setResult={setResultFixedInvestment}
          />
        </div>
        {showFixedInvest && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Tasa de Interés Anual (TNA %)</label>
            <input
              type="number"
              name="interest_rate"
              value={fixedInvestment.interest_rate}
              onChange={(e) => setFixedInvestment({ ...fixedInvestment, interest_rate: e.target.value })}
              placeholder="Ej. 5"
              max={999}
              min={0}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
            />
          </div>
        )}
      </div>

      {/* Botón de envío en una fila completa */}
      <div>
        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Calcular Inversiones
        </button>
      </div>
    </form>
  </div>
);
};

export default InvestForm;

