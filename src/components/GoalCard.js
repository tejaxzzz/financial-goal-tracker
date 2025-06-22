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

  const exportToCSV = () => {
    if (!goal.transactions || goal.transactions.length === 0) {
      alert("No transactions to export!");
      return;
    }

    const headers = ["Title", "Amount", "Date"];
    const rows = goal.transactions.map(txn => [
      goal.title,
      txn.amount,
      txn.date
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${goal.title.replace(/\s+/g, '_')}_transactions.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

          {/* 🎉 Celebration when goal is achieved */}
          {isGoalCompleted && (
            <div className="congrats-popup">
              🎉 Congratulations! You achieved your goal! 🎉
            </div>
          )}

          {/* 💸 Transactions */}
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

          {/* 🧩 Buttons */}
          <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
          <button onClick={() => deleteGoal(goal.id)}>🗑️ Delete</button>
          <button onClick={exportToCSV}>📤 Export CSV</button>
        </>
      )}
    </div>
  );
}

export default GoalCard;
