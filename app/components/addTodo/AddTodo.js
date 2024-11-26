"use client";
import { useEffect, useState } from "react";

const AddTodo = ({ addTodo, editTodo, updateTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const todo = { title, description };

    if (editTodo) {
      updateTodo(editTodo.index, todo);
    } else {
      addTodo(todo);
    }

    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    if (editTodo) {
      setTitle(editTodo.title);
      setDescription(editTodo.description);
    }
  }, [editTodo]);

  return (
    <div className="my-5">
      <div className="container mx-auto border-2 p-3">
        <h2 className="mb-3">{editTodo ? "Edit Todo" : "Add new Todo"}</h2>
        <div className="mb-2">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            required
          />
        </div>
        <div className="mb-2">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-gray-600 rounded-md p-2 mt-5 text-white"
        >
          {editTodo ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
