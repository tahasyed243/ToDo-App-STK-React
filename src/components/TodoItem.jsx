import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'

const TodoItem = ({todo}) => {

  const [isTodoEditable, setIsTodoEditable] = useState(false)  // Local state; check if the todo is in edit mode
  const [todoMsg, setTodoMsg] = useState(todo.todo)   // Local state for todo message editing
  const { updateTodo, deleteTodo, toggleComplete } = useTodo()  // Getting functions from context

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg }) // Update the todo with new message 
    setIsTodoEditable(false)
  }
  const toggleCompleted = () => {
    toggleComplete(todo.id)     // Toggle the completed status of the todo
  }

  return (
    <div
      className={`flex border border-black/10
         rounded-lg px-3 py-1.5 gap-x-3 shadow-sm 
         shadow-white/50 duration-300  text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"      // Change bg color if completed
        }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full 
          bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"
          } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}    // Make input read-only if not in edit mode
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg
         text-sm border border-black/10 justify-center
          items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);     // Toggle edit mode
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm
         border border-black/10 justify-center
          items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem
