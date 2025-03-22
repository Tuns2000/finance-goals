// src/components/GoalList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoalList = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // Получаем цели с бэкенда
    axios.get('http://localhost:3000/goals')
      .then(response => setGoals(response.data))
      .catch(error => console.error('There was an error!', error));
  }, []);

  return (
    <div>
      <h1>My Financial Goals</h1>
      <ul>
        {goals.map(goal => (
          <li key={goal.id}>
            <h2>{goal.name}</h2>
            <p>Target: {goal.target_amount} | Current: {goal.current_amount}</p>
            <p>Due Date: {goal.due_date}</p>
            <p>Category: {goal.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalList;
