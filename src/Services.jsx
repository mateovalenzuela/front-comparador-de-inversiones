export const calculateMoneyMarket = async (data) => {
  try {
    const response = await fetch('http://localhost:8000/money_market_investment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error al calcular money market:', error);
  }
};

export const calculateFixedInvestWithReinvest = async (data) => {
  try {
    const response = await fetch('http://localhost:8000/fixed_term_with_reinvestment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error al calcular las inversiones a plazo fijo con reinversión de intereses:', error);
  }
};

export const calculateFixedInvest = async (data) => {
  try {
    const response = await fetch('http://localhost:8000/fixed_term_without_reinvestment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error al calcular las inversiones a plazo fijo:', error);
  }
};
