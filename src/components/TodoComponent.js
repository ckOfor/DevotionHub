import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, Switch } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import useStore from '../store';
import { useThemeColors } from '../hooks/useThemeColors';

const fetchTodos = async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}
	return response.json();
};

function TodoComponent() {
	const { t } = useTranslation();
	const { data, isLoading, error } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos });
	const { todos, addTodo, removeTodo, toggleTodo, theme, setTheme, language, setLanguage } = useStore();
	const [newTodoText, setNewTodoText] = useState('');
	const colors = useThemeColors();
	
	if (isLoading) return <Text style={{ color: colors.text }}>{t('loading')}</Text>;
	if (error) return <Text style={{ color: colors.text }}>{t('errorOccurred', { message: error.message })}</Text>;
	
	const handleAddTodo = () => {
		if (newTodoText.trim()) {
			addTodo({ id: Date.now(), title: newTodoText, completed: false });
			setNewTodoText('');
		}
	};
	
	const toggleLanguage = () => {
		setLanguage(language === 'en' ? 'es' : 'en');
	};
	
	return (
		<View style={{ padding: 20, backgroundColor: colors.background }}>
			<Text style={{ color: colors.text }}>{t('todosFromApi')}</Text>
			{data.map((todo) => (
				<Text key={todo.id} style={{ color: colors.text }}>{todo.title}</Text>
			))}
			
			<Text style={{ marginTop: 20, color: colors.text }}>{t('yourTodos')}</Text>
			<FlatList
				data={todos}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Switch
							value={item.completed}
							onValueChange={() => toggleTodo(item.id)}
						/>
						<Text style={{ color: colors.text }}>{item.title}</Text>
						<Button title={t('remove')} onPress={() => removeTodo(item.id)} color={colors.accent} />
					</View>
				)}
			/>
			
			<TextInput
				value={newTodoText}
				onChangeText={setNewTodoText}
				placeholder={t('newTodo')}
				placeholderTextColor={colors.secondary}
				style={{ borderWidth: 1, borderColor: colors.primary, padding: 10, marginTop: 20, color: colors.text }}
			/>
			<Button title={t('addTodo')} onPress={handleAddTodo} color={colors.primary} />
			
			<View style={{ marginTop: 20 }}>
				<Text style={{ color: colors.text }}>{t('currentTheme', { theme })}</Text>
				<Button
					title={t('switchToLightTheme')}
					onPress={() => setTheme('light')}
					color={colors.primary}
				/>
				<Button
					title={t('switchToDarkTheme')}
					onPress={() => setTheme('dark')}
					color={colors.primary}
				/>
				<Button
					title={t('switchToSystemTheme')}
					onPress={() => setTheme('system')}
					color={colors.primary}
				/>
			</View>
			
			<View style={{ marginTop: 20 }}>
				<Text style={{ color: colors.text }}>{t('currentLanguage', { language })}</Text>
				<Button
					title={language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
					onPress={toggleLanguage}
					color={colors.primary}
				/>
			</View>
		</View>
	);
}

export default TodoComponent;
