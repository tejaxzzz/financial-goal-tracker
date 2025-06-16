import React, { useContext } from 'react';
import { GoalContext } from '../context/GoalContext';
import GoalCard from './GoalCard';

function Dashboard() {
  const { goals } = useContext(GoalContext);

  if (goals.length === 0) {
    return <p>No goals yet. Add one!</p>;
  }

  return (
    <div className="dashboard">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}

export default Dashboard;
