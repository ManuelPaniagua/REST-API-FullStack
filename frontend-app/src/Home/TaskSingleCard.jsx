import React from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const TaskSingleCard = ({ task }) => {
  return (
    <div className='singleCard'>
      <div>
        <h2>{task.name}</h2>
        <p>{task.description}</p>
      </div>
      <div className='iconContainer'>
        <Link to={`/task/delete/${task.id}`} className={'link-icon-del'}>
          <MdOutlineDelete className='icon-del' />
        </Link>
        <Link to={`/task/edit/${task.id}`} className={'link-icon-update'}>
          <AiOutlineEdit className='icon-update' />
        </Link>
      </div>
    </div>
  );
};
export default TaskSingleCard;
