import React from 'react';
import { View, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import TodoComponent from '../components/TodoComponent';
import { useThemeColors } from '../hooks/useThemeColors';

function HomeScreen({ navigation }) {
	const { t } = useTranslation();
	const colors = useThemeColors();
	
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
			<TodoComponent />
			<Button
				title={t('goToDetails')}
				onPress={() => navigation.navigate('Details')}
				color={colors.primary}
			/>
		</View>
	);
}

export default HomeScreen;
