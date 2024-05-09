import React from 'react'

export default function AddModal() {
  return (
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
  )
}
