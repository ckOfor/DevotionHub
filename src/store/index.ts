import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createDeviceSlice from './slices/deviceSlice';
import createTodoSlice from './slices/todoSlice';

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
