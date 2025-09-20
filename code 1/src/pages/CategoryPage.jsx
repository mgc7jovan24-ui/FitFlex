import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExerciseCard from "../components/ExerciseCard";

const CategoryPage = () => {
  const { type, id } = useParams();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch("http://localhost:3001/exercises");
        const data = await response.json();

        let filtered = [];
        if (type === "bodyPart") {
          filtered = data.filter(ex =>
            ex.bodyPart.toLowerCase().includes(id.toLowerCase())
          );
        } else if (type === "equipment") {
          filtered = data.filter(ex =>
            ex.equipment.toLowerCase().includes(id.toLowerCase())
          );
        }

        setExercises(filtered);
      } catch (error) {
        console.error("Error fetching category exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [type, id]);

  if (loading) return <p>Loading exercises...</p>;

  return (
    <div className="category-exercises-page">
      <h1>
        {type}: <span>{id}</span>
      </h1>

      {exercises.length > 0 ? (
        <div className="exercises">
          {exercises.map(exercise => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      ) : (
        <p>No exercises found for this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
