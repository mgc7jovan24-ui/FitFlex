import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Categories.css';

const BodyPartsCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const fetchData = async (bodyPart) => {
    try {
      const response = await axios.get('http://localhost:5000/exercises'); // local db.json
      const filtered = response.data.filter(
        (exercise) => exercise.bodyPart.toLowerCase() === bodyPart.toLowerCase()
      );
      setExercises(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='category-exercises-page'>
      <h1>Category: <span>{id}</span></h1>

      {exercises.length > 0 ? (
        <div className='exercises'>
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className='exercise'
              onClick={() => navigate(`/exercise/${exercise.id}`)}
            >
              <img src={exercise.gifUrl} alt={exercise.name} />
              <h3>{exercise.name}</h3>
              <ul>
                <li>{exercise.target}</li>
                {exercise.secondaryMuscles.slice(0, 2).map((muscle) => (
                  <li key={muscle}>{muscle}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No exercises found</p>
      )}
    </div>
  );
};

export default BodyPartsCategory;
