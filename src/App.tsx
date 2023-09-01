import AddTodo from "./components/AddTodo";
import Navbar from "./components/Navbar";
import { useTodo } from "./context/todo";
import { useSearchParams } from "react-router-dom";

const App = () => {
  const [searchParams] = useSearchParams();
  let search = searchParams.get("type");
  console.log(search);
  const todosContext = useTodo();

  let renderTodo = todosContext?.todos;

  if (search === "active") {
    renderTodo = renderTodo?.filter((todo) => !todo.completed);
  }

  if (search === "complete") {
    renderTodo = renderTodo?.filter((todo) => todo.completed);
  }

  return (
    <div>
      <h1>Add Some Todo</h1>
      <AddTodo />
      <Navbar />

      {renderTodo?.map((item) => {
        return (
          <li key={item.id}>
            <input
              type="checkbox"
              id={`todo-${item.id}`}
              checked={item.completed}
              onChange={() => todosContext?.toggleTodoAsCompleted(item.id)}
            />
            <label htmlFor={`todo-${item.id}`}>{item.task}</label>
            {item.completed && (
              <button
                type="button"
                onClick={() => todosContext?.deleteTodo(item.id)}
              >
                Delete
              </button>
            )}
          </li>
        );
      })}
    </div>
  );
};

export default App;
