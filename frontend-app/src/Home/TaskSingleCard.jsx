import React from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const TaskSingleCard = ({ task }) => {
  return (
    <div className='singleCard'>
      <div>
        <h2>{task.name}</h2>
        <p>{task.description}</p>
      </div>
      <div className='iconContainer-del'>
        <Link to={`/task/delete/${task.id}`}>
          <MdOutlineDelete className='icon-del' />
        </Link>
      </div>
    </div>
  );
};
export default TaskSingleCard;
