import ToDoList from './components/ToDoList';
import './App.css';

function App() {
  return (
    <div className='bg-blue-100 min-h-screen flex flex-col items-center'>
      <h1 className='text-3xl text-bold text-gray-500 my-5'>TODO LIST</h1>
      <ToDoList/>
    </div>
  );
}

export default App;
