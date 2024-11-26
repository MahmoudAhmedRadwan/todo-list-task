"use client";
import { useEffect, useState } from "react";
import AddTodo from "./components/addTodo/AddTodo";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);

  // add new todo
  const addTodo = (newTodo) => {
    setTodos((previousTodos) => {
      const updatedTodos = [...previousTodos, newTodo];
      localStorage.setItem("todosArray", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  // delete todo using index
  const deleteTodo = (index) => {
    const isConfirmed = window.confirm("Delete this Todo?");
    if (isConfirmed) {
      // delete to from the state and localestorage using filter
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.filter((_, id) => id !== index);
        localStorage.setItem("todosArray", JSON.stringify(updatedTodos));
        return updatedTodos;
      });
    }
  };

  // edit todo using index
  const startEditing = (index) => {
    const todoToEdit = todos[index];
    setEditTodo({ ...todoToEdit, index });
  };

  const updateTodo = (index, updatedTodo) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index] = updatedTodo;
      localStorage.setItem("todosArray", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
    setEditTodo(null);
  };
  
  useEffect(() => {
    // get the todos from locale storage
    const storedTodos = localStorage.getItem("todosArray");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  return (
    <div>
      <nav className="flex justify-between p-5 bg-slate-200">
        <div>
          <h2>Todo-List</h2>
        </div>
      </nav>

      <main>

        {/* add todo component */}
        <AddTodo
          addTodo={addTodo}
          editTodo={editTodo}
          updateTodo={updateTodo}
        />

        {/* List of todos */}
        <div className="container mx-auto">
          <div className="todo_container mt-5">
            {todos.length > 0 ? (
              todos.map((data, index) => (
                <div
                  className="single_todo md:flex justify-between align-center mb-3 border-b-2 border-gray-600"
                  key={index}
                >
                  <div className="px-2">
                    <div className="title mb-2">
                      <h3 className="text-gray-600">{data?.title}</h3>
                    </div>
                    <div className="description">
                      <p className="text-gray-700">{data?.description}</p>
                    </div>
                  </div>
                  <div className="actions my-3">
                    {/* delete todo */}
                    <button
                      className="bg-red-600 rounded-md p-2 text-white mx-2"
                      onClick={() => deleteTodo(index)}
                    >
                      Delete
                    </button>

                    {/* update todo */}
                    <button
                      className="bg-gray-600 rounded-md p-2 text-white mx-2"
                      onClick={() => startEditing(index)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center"> No Todos Found </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
