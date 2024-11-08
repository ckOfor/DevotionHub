const createTodoSlice = (set) => ({
	todos: [],
	addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
	removeTodo: (id) => set((state) => ({ todos: state.todos.filter(todo => todo.id !== id) })),
	toggleTodo: (id) => set((state) => ({
		todos: state.todos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		)
	})),
});

export default createTodoSlice;
