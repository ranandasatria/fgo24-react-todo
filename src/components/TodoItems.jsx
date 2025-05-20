import { useContext } from 'react'
import TodoContext from './TodoContext'

function TodoItem({ todoItem, index }) {
  const { toggleTodoStatus, deleteTodo } = useContext(TodoContext)

  const handleChange = () => {
    toggleTodoStatus(index)
  }

  const handleDelete = () => {
    deleteTodo(index)
  }

  return (
    <li className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-200">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todoItem.completed}
          onChange={handleChange}
          className="h-5 w-5 accent-red-500 cursor-pointer"
        />
        <span
          className={`${
            todoItem.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {todoItem.todo}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="text-red-400 hover:text-red-600 text-xl"
        title="Delete"
      >
        🗑
      </button>
    </li>
  )
}

export default TodoItem
