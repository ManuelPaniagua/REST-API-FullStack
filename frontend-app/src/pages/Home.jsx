import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [tasks, setTasks] = useState([]);

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
      <h1>List of Tasks</h1>
      <Link to='/task/new'>
        <button>Add new Task</button>
      </Link>
      {tasks.map((task) => (
        <li key={task.id}>
          <h2>{task.name}</h2>
          <p>{task.description}</p>
        </li>
      ))}
    </div>
  );
};
export default Home;
