import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateTasks = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveTask = () => {
    // Validate inputs
    if (!name.trim() || !description.trim()) {
      enqueueSnackbar('Please enter both name and description', {
        variant: 'warning',
      });
      return;
    }
    const data = {
      name,
      description,
    };
    axios
      .post('http://localhost:3000/task', data)
      .then(() => {
        enqueueSnackbar('Task created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  return (
    <div>
      <h1>Create Task</h1>
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
      <button onClick={handleSaveTask}>Add Task</button>
    </div>
  );
};
export default CreateTasks;
