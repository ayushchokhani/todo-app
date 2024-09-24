import { useState, useEffect } from 'react'
import {TodoProvider} from "./contexts"
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

  //
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    //todo is also an object, making a new id and copying rest of data
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }


  const updateTodo = (id, todo) => {
    //traversing on todos and if the id matches then update it

    //prev is the old array and prevTodo is the individual todo
    //if id matches then update it to new todo else remain it prevTodo
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    //map is not preferred when using delete function
    //instead use filter for deleting elements, filter works on true statements, therefore removing the values that are not equal
    setTodos((prev) => prev.filter((prevTodo) => (prevTodo.id !== id)))
  }

  const toggleComplete = (id) => {
    //traverse on todos to find the todo with same id 
    //as each todo is an object, copy the old values then overwrite the completed value
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed}: prevTodo))
  }

  useEffect(() => {
     const todos = JSON.parse(localStorage.getItem("todos"))

      if(todos && todos.length > 0) {
        setTodos(todos)
      }

  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
            </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id}
              className='w-full'>
                  <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
