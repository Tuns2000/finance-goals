import React, { useState } from 'react';

const CreateGoal = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const createGoal = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const response = await fetch('http://localhost:5000/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, amount, date }),
    });

    const data = await response.json();
    
    if (response.ok) {
      alert('Goal created successfully');
    } else {
      alert('Error creating goal');
    }
  };

  return (
    <div>
      <h2>Create Goal</h2>
      <form onSubmit={createGoal}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Goal Name"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Target Date"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateGoal;
