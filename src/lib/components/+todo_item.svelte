<script lang="ts">
    import type { Todo } from "$lib/TodoStore";
    import { todoStore } from "$lib/TodoStore";

    export let todo: Todo;
    function handleToggle() {
        todoStore.toggleTodo(todo.id);
    }
    function deleteTodo() {
        todoStore.deleteTodo(todo.id);
    }
</script>

<div class="is-flex">
    <label class="panel-block" style="width: 100%" class:completed={todo.completed}>
        <input type="checkbox" checked={todo.completed} on:change={handleToggle}/>
        <span>{todo.text}</span>
    </label>
    <button style="height: auto;" on:click={deleteTodo}>Delete</button>
</div>

<style>
    .completed span {
      text-decoration: line-through;
      color: #888;
    }
  </style>