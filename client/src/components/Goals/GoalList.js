// src/components/GoalList.js
import React, { useEffect, useState } from 'react';
import { getGoals } from '../../api/goalApi';  // Импортируем API

const GoalList = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const data = await getGoals();
        setGoals(data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
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
