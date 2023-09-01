import { ReactNode, createContext, useContext, useState } from "react";

export type TodoProviderProps = {
  children: ReactNode;
};

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createAt: Date;
};

export type TodosContext = {
  todos: Todo[];
  handleAddToDo: (task: string) => void;
  toggleTodoAsCompleted: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export const todosContext = createContext<TodosContext | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddToDo = (task: string) => {
    setTodos((preData) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createAt: new Date(),
        },
        ...preData,
      ];
      return newTodos;
    });
  };

  const toggleTodoAsCompleted = (id: string) => {
    setTodos((pre) => {
      let newTodos = pre.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return newTodos;
    });
  };

  const deleteTodo = (id: string) => {
    setTodos((preValue) => {
      let data = preValue.filter((todo) =>todo.id !== id);
      return data;
    });
  };

  return (
    <todosContext.Provider
      value={{ todos, handleAddToDo, toggleTodoAsCompleted, deleteTodo }}
    >
      {children}
    </todosContext.Provider>
  );
};

// Consumer

export const useTodo = () => {
  const todoConsumer = useContext(todosContext);
  if (!todoConsumer) {
    console.log("Some Error Occurrd!");
  }
  return todoConsumer;
};
