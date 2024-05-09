import React, {useState, useEffect} from 'react'
import Task from './Task'
import moment from 'moment/moment';

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    const fetchTasks = async() => {
      try {
        const res = await fetch('http://localhost:8000/tasks')
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTasks();
  }, [])

  const addTasks = async() => {
    const newTask = {
      id: Date.now(),
      taskName,
      dueDate: moment().add(dueDate, 'days'),
      completed: false
    };

    const res = await fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });

    setTasks([...tasks, newTask]);
    setTaskName('');
    setShowAddModal(false);
  };

  const deleteTasks = async(id) => {
    const confirm = window.confirm('Are you sure you want to delete this task?');
    if (!confirm) return;

    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter(task => task.id !== id));
    return;
  }

  const toggleShowEditModal = () => {
    setShowEditModal(true);
  }

  const editTask = (task) => {
    console.log(task);
  }

  return (
    <>
      <section>
        <button 
          className='bg-indigo-500 py-2 px-4 text-white rounded-md hover:bg-indigo-600'
          onClick={() => setShowAddModal(true)}
        >
          Add Task
        </button>
      </section>

      {showAddModal && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Add Task</h2>
          <form onSubmit={addTasks}>
            <label htmlFor='name'>Name: </label>
            <input
              type='text'
              placeholder='e.g. Finish laundry'
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}  
              className="block w-full border-gray-300 rounded-md px-4 py-2 mb-4"
            />
            
            <label htmlFor='duedate'>Due Date(in days): </label>
            <input
              type='number'
              placeholder='due in days'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}  
              className="block w-full border-gray-300 rounded-md px-4 py-2 mb-4"
            />
            <button 
              type="submit" 
              className="bg-indigo-500 py-2 px-4 text-white rounded-md hover:bg-indigo-600"
            >
              Add
            </button>
            <button 
              type="button" 
              onClick={() => setShowAddModal(false)} 
              className="ml-2 bg-gray-300 py-2 px-4 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
      )}

      {showEditModal &&
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Edit Task</h2>
            <form onSubmit={editTask}>
              <label htmlFor='name'>Name: </label>
              <input
                type='text'
                placeholder='e.g. Finish laundry'
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}  
                className="block w-full border-gray-300 rounded-md px-4 py-2 mb-4"
              />
              
              <label htmlFor='duedate'>Due Date(in days): </label>
              <input
                type='number'
                placeholder='due in days'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}  
                className="block w-full border-gray-300 rounded-md px-4 py-2 mb-4"
              />
              <button 
                type="submit" 
                className="bg-indigo-500 py-2 px-4 text-white rounded-md hover:bg-indigo-600"
              >
                Edit
              </button>
              <button 
                type="button" 
                onClick={() => setShowEditModal(false)} 
                className="ml-2 bg-gray-300 py-2 px-4 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      }

      <section className='bg-violet-50 rounded-md shadow-md my-5 py w-4/5'>
        {tasks.map(task => (
          <div key={task.id}>
            <Task 
              task={task}
              deleteTask={deleteTasks}
              editTask={toggleShowEditModal}
            />
          </div>
        ))}
      </section>
    </>
  )
}
