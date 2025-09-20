import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Exercise.css"; // You can reuse one of your existing CSS files

const ExercisePage = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExerciseData = async () => {
      setLoading(true);
      try {
        // Using a single, consistent API endpoint
        const response = await fetch("http://localhost:3001/exercises");
        const data = await response.json();
        const foundExercise = data.find((ex) => ex.id === id);
        setExercise(foundExercise);
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseData();
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading Exercise...</p>;
  }

  if (!exercise) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Exercise not found.</p>;
  }

  // Helper to extract YouTube ID from a full URL
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="exercise-page">
      <h1>{exercise.name}</h1>

      <div className="exercise-top">
        <img className="exercise-gif" src={exercise.gifUrl} alt={exercise.name} />
        <div className="exercise-info">
          <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
          <p><strong>Target Muscle:</strong> {exercise.target}</p>
          <p><strong>Equipment:</strong> {exercise.equipment}</p>

          {exercise.steps && (
            <div className="exercise-steps">
              <h3>Steps</h3>
              <ol>
                {exercise.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

      {exercise.videos && exercise.videos.length > 0 && (
        <div className="related-videos">
          <h3>Related Videos</h3>
          <div className="video-list">
            {exercise.videos.map((videoUrl, index) => {
              const videoId = getYouTubeId(videoUrl);
              if (!videoId) return null; // Skip if the URL is not a valid YouTube link
              return (
                <div key={index} className="video-card">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`${exercise.name} Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExercisePage;