import React from 'react';
import moment from 'moment';

export default function Task({ task, deleteTask, editTask }) {
  return (
    <section className="flex items-center bg-white m-3 p-2">
      <input 
        type='checkbox'
      />
      <div className="ml-3">
        <h1 className="text-lg font-bold text-gray-600">{task.taskName}</h1>
        <p>Due Date: {moment(task.dueDate).format('YYYY-MM-DD')}</p>
      </div>
      <div className='ml-auto flex'>
        <div className="ml-auto p-2 bg-gray-300 rounded-md mr-3">
          <img 
            src={require('../assets/bin.png')} 
            alt='bin' 
            className='h-5 w-5'
            onClick={() => deleteTask(task.id)}
          />
        </div>
        <div className="ml-auto p-2 bg-gray-300 rounded-md">
          <img 
            src={require('../assets/edit.webp')} 
            alt='bin' 
            className='h-5 w-5'
            onClick={() => editTask(task)}
          />
        </div>
      </div>
    </section>
  );  
}
