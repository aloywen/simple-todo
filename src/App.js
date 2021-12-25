import './App.css';
import { useState } from 'react'

function App() {
  const [kegiatan, setKegiatan] = useState('');
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({});
  const [message, setMessage] = useState('');

  function getID() {
    return Date.now()
  }

  function addTodo(e) {
    e.preventDefault()

    if (!kegiatan) {
      return setMessage('Isi aku mass!')
    }

    setMessage('')

    if (edit.id) {
      const newTodo = {
        id: edit.id,
        kegiatan
      }

      const findIndex = todos.findIndex(function (todo) {
        return todo.id === edit.id
      })

      const updateTodo = [...todos]
      updateTodo[findIndex] = newTodo

      setTodos(updateTodo)
      return cancelHandler()
    }

    setTodos([...todos, {
      id: getID(),
      kegiatan
    }]);
    setKegiatan('')
    setMessage('')
  }

  function removeHandler(todoId) {
    const filteredTodos = todos.filter(function (todos) {
      return todos.id !== todoId;
    })

    setTodos(filteredTodos);
    if (edit.id) {
      cancelHandler()
    }
  }

  function editHandler(todo) {
    setKegiatan(todo.kegiatan)
    setEdit(todo)
  }

  function cancelHandler() {
    setEdit({})
    setKegiatan('')
  }

  return (
    <div className='flex flex-col justify-center items-center bg-gray-800 h-screen relative'>
      <div>
        <h1 className='text-blue-200 font-bold font-mono'>Simple Todo List</h1>


        <form onSubmit={addTodo} className='mt-6'>
          {message && <div className='text-red-300'>{message}</div>}
          <input className=' p-1 rounded-lg border-solid border-2 border-blue-500' type="text" value={kegiatan} placeholder='Nama Kegiatan' onChange={function (e) {
            setKegiatan(e.target.value)
          }} />
          <button className='bg-blue-500 px-2 py-1 rounded-lg ml-3 text-white' type='submit'>{edit.id ? 'Save' : 'Submit'}</button>
          {edit.id && <button className='bg-red-500 px-2 py-1 rounded-lg ml-3 text-white' onClick={cancelHandler}>cancel</button>}
        </form>

        {todos.length > 0 ?
          <ul className='text-white mt-4 ml-4'>
            {todos.map(function (todo) {
              return <li className='my-2' key={todo.id}>- {todo.kegiatan}
                <button className='bg-yellow-500 mx-3 rounded px-2' onClick={editHandler.bind(this, todo)}>edit</button>
                <button className='bg-red-500 rounded px-2' onClick={removeHandler.bind(this, todo.id)}>hapus</button>
              </li>
            })}
          </ul>
          : <p className='text-yellow-400 mt-2'>Belum Ada Kegiatan Nih!</p>}
      </div>
      <div className='text-white font-bold flex items-center absolute bottom-0 mb-6'>
        <p>Made with</p>
        <svg className="w-8 h-8 fill-red-500" fill="" stroke="" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        <p>AliAnw</p>
      </div>
    </div>
  );
}

export default App;
