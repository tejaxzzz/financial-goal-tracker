import React, { useState, useContext } from 'react';
import { GoalContext } from '../context/GoalContext';

function GoalCard({ goal }) {
  const { updateGoal, deleteGoal } = useContext(GoalContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newAmount, setNewAmount] = useState(goal.currentAmount);
  const [newTitle, setNewTitle] = useState(goal.title);

  const handleUpdate = () => {
    const updatedGoal = {
      ...goal,
      title: newTitle,
      currentAmount: parseFloat(newAmount),
    };
    updateGoal(goal.id, updatedGoal);
    setIsEditing(false);
  };

  const percentage = Math.min(
    Math.round((goal.currentAmount / goal.targetAmount) * 100),
    100
  );

  const isGoalCompleted = goal.currentAmount >= goal.targetAmount;

  return (
    <div className="goal-card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="number"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{goal.title}</h3>
          <p>Target: ₹{goal.targetAmount}</p>
          <p>Saved: ₹{goal.currentAmount}</p>
          <div className="progress-bar">
            <div className="fill" style={{ width: `${percentage}%` }}></div>
          </div>
          <p>{percentage}% Complete</p>

          {/* ✅ 🎉 Celebration message when goal is achieved */}
          {isGoalCompleted && (
            <div className="congrats-popup">
              🎉 Congratulations! You achieved your goal! 🎉
            </div>
          )}

          {/* ✅ Transaction Log Section */}
          {goal.transactions && goal.transactions.length > 0 && (
            <div className="transactions">
              <h4>Transaction Log:</h4>
              <ul>
                {goal.transactions.map((txn) => (
                  <li key={txn.id}>
                    ₹{txn.amount > 0 ? `+${txn.amount}` : txn.amount} on {txn.date}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ✅ Buttons */}
          <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
          <button onClick={() => deleteGoal(goal.id)}>🗑️ Delete</button>
        </>
      )}
    </div>
  );
}

export default GoalCard;
