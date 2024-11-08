import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const createDeviceSlice = (set) => ({
	theme: 'light',
	language: 'en',
	setTheme: (theme) => set({ theme }),
	setLanguage: (language) => set({ language }),
});

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

const useStore = create(
	persist(
		(set, get) => ({
			...createDeviceSlice(set),
			...createTodoSlice(set),
		}),
		{
			name: 'app-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);

export default useStore;
