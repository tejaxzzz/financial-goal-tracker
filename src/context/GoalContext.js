import React, { createContext, useState } from 'react';

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      transactions: [
        {
          id: Date.now(),
          amount: goal.currentAmount,
          date: new Date().toLocaleString(),
        },
      ],
    };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  const updateGoal = (id, updatedGoal) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === id) {
          const updatedTransactions = [
            ...goal.transactions,
            {
              id: Date.now(),
              amount: updatedGoal.currentAmount - goal.currentAmount,
              date: new Date().toLocaleString(),
            },
          ];

          return {
            ...updatedGoal,
            transactions: updatedTransactions,
          };
        }
        return goal;
      })
    );
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  return (
    <GoalContext.Provider value={{ goals, addGoal, updateGoal, deleteGoal }}>
      {children}
    </GoalContext.Provider>
  );
};
