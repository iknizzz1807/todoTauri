<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { todoStore } from "$lib/TodoStore";
    import TodoItem from "$lib/components/+todo_item.svelte";
    import type { Todo } from "$lib/TodoStore";

    let newTodoText = '';
    let todos: Todo[] = [];

    let unsubscribe: () => void;
    onMount(() => {
        todoStore.loadTodos();
        unsubscribe = todoStore.subscribe((value) => {
            todos = value;
        });
    });

    onDestroy(() => {
        unsubscribe();
    });

    function handleSubmit() {
        if (newTodoText.trim()) {
            todoStore.addTodo(newTodoText);
            newTodoText = '';
        }
    }

</script>

<div class="is-flex is-flex-direction-column" style="width: 60%; gap: 24px;">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="is-flex is-flex-direction-row">
            <input
                class="input is-medium"
                type="text"
                placeholder="What do you want to do?"
                maxlength="64" bind:value={newTodoText}
            />
            <button class="button is-primary ml-4" style="width: 20%;">Add</button>
        </div>
    </form>
    <nav class="panel scrollable-panel" style="max-height: 80vh; overflow-y: auto">
        {#each todos as todo (todo.id)}
            <TodoItem {todo} />
        {/each}
    </nav>
</div>