import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
