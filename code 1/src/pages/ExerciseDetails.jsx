import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ExerciseDetails.css";

const ExerciseDetails = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await fetch("http://localhost:3001/exercises");
        const data = await response.json();
        const foundExercise = data.find((ex) => ex.id === id);
        setExercise(foundExercise);
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }
    };
    fetchExercise();
  }, [id]);

  if (!exercise) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  return (
    <div className="exercise-details">
      <h2>{exercise.name}</h2>

      <div className="exercise-main">
        <img src={exercise.gifUrl} alt={exercise.name} className="exercise-gif" />
        <div className="exercise-description">{exercise.description}</div>
      </div>

      {exercise.steps && (
        <div className="exercise-steps">
          <h3>Steps</h3>
          <ul>{exercise.steps.map((step, idx) => <li key={idx}>{step}</li>)}</ul>
        </div>
      )}

      {exercise.videos && (
        <div className="exercise-videos">
          <h3>Related Videos</h3>
          {exercise.videos.map((video, idx) => {
            const videoId = video.split("v=")[1].split("&")[0];
            return (
              <iframe
                key={idx}
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`video-${idx}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExerciseDetails;
