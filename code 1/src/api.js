// src/api.js
import axios from "axios";

const API_BASE = "http://localhost:5000";

// Get all exercises
export const getExercises = async () => {
  try {
    const response = await axios.get(`${API_BASE}/exercises`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
};

// Get exercise by ID
export const getExerciseById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/exercises/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching exercise details:", error);
    return null;
  }
};

// Search exercises by keyword (manual filtering for case-insensitive match)
export const searchExercises = async (query) => {
  try {
    const response = await axios.get(`${API_BASE}/exercises`);
    const allExercises = response.data;

    const filtered = allExercises.filter((exercise) => {
      const searchTerm = query.toLowerCase();
      return (
        exercise.name.toLowerCase().includes(searchTerm) ||
        exercise.bodyPart.toLowerCase().includes(searchTerm) ||
        exercise.target.toLowerCase().includes(searchTerm) ||
        exercise.equipment.toLowerCase().includes(searchTerm)
      );
    });

    return filtered;
  } catch (error) {
    console.error("Error searching exercises:", error);
    return [];
  }
};
