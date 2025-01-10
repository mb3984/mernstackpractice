import axios from "axios";

const API_URL = "http://localhost:4000";

export const getTodos = async () => {
  const response = await axios.get(`${API_URL}/get/todos`);
  return response.data;
};

export const addTodo = async (text) => {
  const response = await axios.post(`${API_URL}/save/todo`, { text });
  return response.data;
};

export const updateTodo = async (id, text) => {
  const response = await axios.put(`${API_URL}/update/todo`, { _id: id, text });
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`);
  return response.data;
};
