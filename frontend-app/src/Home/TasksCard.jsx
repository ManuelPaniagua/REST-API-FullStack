import React from 'react';
import TaskSingleCard from './TaskSingleCard';

const TasksCard = ({ tasks }) => {
  return (
    <div>
      {tasks.map((item) => (
        <TaskSingleCard key={item.id} task={item} />
      ))}
    </div>
  );
};
export default TasksCard;
