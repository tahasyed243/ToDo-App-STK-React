import { useState, useEffect } from 'react'
import './App.css'
import { TodoProvider } from './context'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { Header } from './components/Header'


function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])   // Add new todo by unique id with prev todos  
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))  // Update the todo with matching id
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? {
          ...prevTodo,
          completed: !prevTodo.completed
        } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))   // browser me saved todos uthao

    if (todos && todos.length > 0) {              // agar kuch todos mile to set karo
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))    // todos ko local storage me save kar do
  }, [todos])


  return (
    <>
      <Header />
      <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>   {/* saare funtions aur todos ajayein*/}
        <div className="bg-gray-900 h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-5xl font-bold text-center mb-12 mt-4">Manage Your Todos</h1>
            <div className="mb-4">
              {/* Todo form goes here */}
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((todo) => (    
                <div key={todo.id}
                  className='w-full'
                >
                  <TodoItem todo={todo} />    {/* passing each todo as prop to TodoItem */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </TodoProvider>
    </>
  )
}

export default App
