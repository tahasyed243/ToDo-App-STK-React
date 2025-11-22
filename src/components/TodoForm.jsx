import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'


const TodoForm = () => {

  const [todo, setTodo] = useState("")
  const { addTodo } = useTodo()   // Get {addTodo} function from context

  const add = (e) => {
    e.preventDefault()    // Prevent form submission reload

    if (!todo.trim()) return

    addTodo({ todo, completed: false })   //new todo add karna 
    setTodo("")
  }

  return (
    <form className="flex border-gray-950"
      onSubmit={add}>
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border rounded-l-lg
         px-3 outline-none duration-150 bg-white/20 py-1.5 border-white"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}   // Update local state on input change
      />
      <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
