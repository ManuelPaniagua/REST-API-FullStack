import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import e from 'cors';

const EditTask = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/task/${id}`)
      .then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
      })
      .catch((error) => {
        alert('An error happened. Please check console');
        console.log(error);
      });
  }, []);

  const handleEditTask = () => {
    // Validate inputs
    if (!name.trim() || !description.trim()) {
      enqueueSnackbar('Please not empty values', {
        variant: 'warning',
      });
      return;
    }
    const data = {
      name,
      description,
    };
    axios
      .put(`http://localhost:3000/task/${id}`, data)
      .then(() => {
        enqueueSnackbar('Task edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  return (
    <div>
      <h1>Edit Task</h1>
      <div className='addingTask'>
        <label>Name of the Task</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='addingTask'>
        <label>Description</label>
        <textarea
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button onClick={handleEditTask}>Add Task</button>
    </div>
  );
};

export default EditTask;
