import React, { useState } from 'react';
import InvestmentForm from './InvestmentForm';
import InvestmentResults from './InvestmentResults';
import {calculateFixedInvestWithReinvest, calculateMoneyMarket, calculateFixedInvest} from "./Services.jsx";


const App = () => {
  const [resultsMoneyMarket, setResultsMoneyMarket] = useState([]);
  const [resultsFixedInvest, setResultsFixedInvest] = useState([]);
  const [resultsFixedInvestWithReinvest, setResultsFixedInvestWithReinvest] = useState([]);

// Manejar la actualización del estado con los resultados calculados
    const handleCalculateMoneyMarket = async (investment) => {
      const result = await calculateMoneyMarket(investment);
      setResultsMoneyMarket(result);
    };

    // Similar para las otras funciones
    const handleCalculateFixedInvest = async (investment) => {
      const result = await calculateFixedInvest(investment);
      setResultsFixedInvest(result);
    };

    const handleCalculateFixedInvestWithReinvest = async (investment) => {
      const result = await calculateFixedInvestWithReinvest(investment);
      setResultsFixedInvestWithReinvest(result);
    };


  return (
    <div className="container mx-auto p-4">
      <InvestmentForm
          onCalculateMoneyMarket={handleCalculateMoneyMarket}
          onCalculateFixedInvest={handleCalculateFixedInvest}
          onCalculateFixedInvestWithReinvest={handleCalculateFixedInvestWithReinvest}
          setResultCompoundInvestment={setResultsMoneyMarket}
          setResultFixedInvestment={setResultsFixedInvest}
          setResultInvestWithReinvest={setResultsFixedInvestWithReinvest}
      />
      {(resultsMoneyMarket.length > 0 || resultsFixedInvest.length > 0 || resultsFixedInvestWithReinvest.length > 0) && (
          <InvestmentResults
              resultsFixedInvest={resultsFixedInvest}
              resultsMoneyMarket={resultsMoneyMarket}
              resultsFixedInvestWithReinvest={resultsFixedInvestWithReinvest}
          />
      )}
    </div>
  );
};

export default App;
