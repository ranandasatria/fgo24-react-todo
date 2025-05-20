import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import TodoContext from './components/TodoContext'
import TodoItem from './components/TodoItems'

function App() {
  const { register, reset, handleSubmit } = useForm()
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todo-list'))
    if (savedTodos) {
      setTodos(savedTodos)
    }
  }, [])

  const onSubmit = (data) => {
    const newTodo = { todo: data.todo, completed: false }
    const newList = [...todos, newTodo]
    setTodos(newList)
    localStorage.setItem('todo-list', JSON.stringify(newList))
    reset()
  }

  const toggleTodoStatus = (targetIndex) => {
    const updatedTodos = [...todos]
    updatedTodos[targetIndex].completed = !updatedTodos[targetIndex].completed
    setTodos(updatedTodos)
    localStorage.setItem('todo-list', JSON.stringify(updatedTodos))
  }

 const deleteTodo = (targetIndex) => {
  const updatedTodos = todos.filter((_, currentIndex) => currentIndex !== targetIndex)
  setTodos(updatedTodos)
  localStorage.setItem('todo-list', JSON.stringify(updatedTodos))
}


  return (
    <TodoContext value={{ toggleTodoStatus, deleteTodo }}>
      <div className='min-h-screen bg-red-50 p-8'>
        <div className='max-w-xl mx-auto bg-white shadow-md rounded-lg p-6'>
          <h1 className='text-2xl font-bold mb-4 text-red-600'>Get things done!</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-2 mb-6'>
            <input
              type="text"
              className='flex-grow border rounded px-4 py-2 focus:outline-red-600'
              placeholder='Add a new task ...'
              {...register('todo')}
            />
            <button
              type='submit'
              className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700'
            >Add</button>
          </form>
          <ul className='space-y-2'>
            {todos.map((todoItem, index) => (
              <TodoItem key={index} todoItem={todoItem} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </TodoContext>
  )
}

export default App
