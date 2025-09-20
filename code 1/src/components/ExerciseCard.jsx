import React from "react";
import "../styles/ExerciseCard.css";

const ExerciseCard = ({ exercise, onClick }) => {
  return (
    <div className="exercise-card" onClick={onClick}>
      <img
        src={exercise.gifUrl}
        alt={exercise.name}
        className="exercise-gif"
      />
      <div className="exercise-info">
        <h3>{exercise.name}</h3>
        <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
        <p><strong>Target:</strong> {exercise.target}</p>
        <p><strong>Equipment:</strong> {exercise.equipment}</p>
      </div>
    </div>
  );
};

export default ExerciseCard;
