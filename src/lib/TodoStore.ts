import { writable } from "svelte/store";
import { invoke } from "@tauri-apps/api/tauri";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function createTodoStore() {
  const { subscribe, set, update } = writable<Todo[]>([]);
  return {
    subscribe,
    addTodo: (text: string) =>
      update((todos) => {
        const newTodo: Todo = { id: Date.now(), text, completed: false };
        const newTodos = [...todos, newTodo];
        invoke("write_todos", { todos: newTodos });
        return newTodos;
      }),
    toggleTodo: (id: number) =>
      update((todos) => {
        const newTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        invoke("write_todos", { todos: newTodos });
        return newTodos;
      }),
    deleteTodo: (id: number) =>
      update((todos) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        invoke("write_todos", { todos: newTodos });
        return newTodos;
      }),
    loadTodos: async () => {
      const todos: Todo[] = await invoke("read_todos");
      set(todos);
    },
  };
}

export const todoStore = createTodoStore();
