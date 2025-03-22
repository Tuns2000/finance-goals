import axios from 'axios';

const API_URL = 'http://localhost:3000';  // URL твоего бэкенда

export const getGoals = async () => {
  try {
    const response = await axios.get(`${API_URL}/goals`);
    return response.data;
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};

export const createGoal = async (goal) => {
  try {
    const response = await axios.post(`${API_URL}/goals`, goal);
    return response.data;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};
