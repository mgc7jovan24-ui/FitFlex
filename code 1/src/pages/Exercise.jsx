import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Exercise.css";

const Exercise = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        // Fetch exercises from local db.json
        const response = await fetch("http://localhost:3001/exercises");
        const data = await response.json();
        const foundExercise = data.find((ex) => ex.id === id);
        setExercise(foundExercise);

        // Fetch related YouTube videos (dummy data for demo)
        if (foundExercise) {
          // Replace with real API if needed
          const videos = [
            {
              id: "1",
              title: `${foundExercise.name} Tutorial 1`,
              url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
              id: "2",
              title: `${foundExercise.name} Tutorial 2`,
              url: "https://www.youtube.com/embed/oHg5SJYRHA0",
            },
            {
              id: "3",
              title: `${foundExercise.name} Tutorial 3`,
              url: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
            },
          ];
          setRelatedVideos(videos);
        }
      } catch (error) {
        console.error("Error fetching exercise:", error);
      }
    };

    fetchExerciseData();
  }, [id]);

  if (!exercise) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</p>;

  return (
    <div className="exercise-page">
      <h1>{exercise.name}</h1>

      <div className="exercise-top">
        <img className="exercise-gif" src={exercise.gifUrl} alt={exercise.name} />

        <div className="exercise-info">
          <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
          <p><strong>Target Muscle:</strong> {exercise.target}</p>
          <p><strong>Equipment:</strong> {exercise.equipment}</p>

          <div className="exercise-steps">
            <h3>Steps</h3>
            <ol>
              {exercise.steps?.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {relatedVideos.length > 0 && (
        <div className="related-videos">
          <h3>Related Videos</h3>
          <div className="video-list">
            {relatedVideos.map((video) => (
              <div key={video.id} className="video-card">
                <iframe
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercise;
