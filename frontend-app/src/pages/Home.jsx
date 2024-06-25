import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TasksCard from '../Home/TasksCard';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const totalOfTask = tasks.length;

  useEffect(() => {
    axios
      .get('http://localhost:3000/task')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h1 style={{ marginBottom: '10px' }}>List of Tasks</h1>
      <Link to='/task/new'>
        <button>Add new Task</button>
      </Link>
      <TasksCard tasks={tasks} />
      <span>Total of tasks: {totalOfTask}</span>
    </div>
  );
};
export default Home;
