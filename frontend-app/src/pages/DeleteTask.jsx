import React, { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteTask = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleDeleteTask = () => {
    axios
      .delete(`http://localhost:3000/task/${id}`)
      .then(() => {
        enqueueSnackbar('Task deleted successfully'), { variant: 'success' };
        navigate('/');
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  const handleNo = () => {
    navigate('/');
  };
  return (
    <div>
      <h1>Sure to delete?</h1>
      <button onClick={handleDeleteTask}>Yes</button>
      <button onClick={handleNo}>No</button>
    </div>
  );
};
export default DeleteTask;
