import React, { FormEvent, useState } from "react";
import { useTodo } from "../context/todo";

const AddTodo = () => {
  const todosContext = useTodo();
  const [add, setAdd] = useState("");

  function createTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    todosContext?.handleAddToDo(add);
    setAdd("");
  }
  return (
    <div>
      <form onSubmit={createTodo}>
        <input
          type="text"
          value={add}
          onChange={(e) => setAdd(e.target.value)}
          placeholder="Some Typing..."
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
