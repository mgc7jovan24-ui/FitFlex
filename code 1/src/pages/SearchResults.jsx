import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/SearchResults.css";

const SearchResults = () => {
  const { query } = useParams();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/exercises");
        const data = await response.json();

        const filtered = data.filter((exercise) => {
          const searchTerm = query?.toLowerCase();
          return (
            !searchTerm ||
            exercise.name.toLowerCase().includes(searchTerm) ||
            exercise.bodyPart.toLowerCase().includes(searchTerm) ||
            exercise.target.toLowerCase().includes(searchTerm) ||
            exercise.equipment.toLowerCase().includes(searchTerm)
          );
        });

        setExercises(filtered);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [query]);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Searching for exercises...</p>;
  }

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      {exercises.length > 0 ? (
        <div className="exercise-grid">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="exercise-card"
              onClick={() => navigate(`/exercise/${exercise.id}`)} // Make sure this route points to your new ExercisePage
            >
              <div className="exercise-icon">
                <span>{exercise.name.charAt(0)}</span>
              </div>
              <div className="exercise-info">
                <h3>{exercise.name}</h3>
                <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
                <p><strong>Target:</strong> {exercise.target}</p>
                <p><strong>Equipment:</strong> {exercise.equipment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No exercises found for "{query}".</p>
      )}
    </div>
  );
};

export default SearchResults;