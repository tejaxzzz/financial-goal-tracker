import React, { useState, useContext } from 'react';
import { GoalContext } from '../context/GoalContext';

function GoalForm() {
  const { addGoal } = useContext(GoalContext);

  const [title, setTitle] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !targetAmount) return;

    const newGoal = {
      id: Date.now(),
      title,
      targetAmount: parseFloat(targetAmount),
      currentAmount: parseFloat(currentAmount) || 0,
    };

    addGoal(newGoal);

    // Clear form
    setTitle('');
    setTargetAmount('');
    setCurrentAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <h2>Add New Goal</h2>
      <input
        type="text"
        placeholder="Goal title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Target amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Current amount (optional)"
        value={currentAmount}
        onChange={(e) => setCurrentAmount(e.target.value)}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;
