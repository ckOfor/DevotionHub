import React from 'react';
import {Button, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import useStore from '../store';
import {useThemeColors} from '../hooks/useThemeColors';

function DetailsScreen({navigation}) {
	const {t} = useTranslation();
	const {theme, language, todos} = useStore();
	const colors = useThemeColors();
	
	return (
		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background}}>
			<Text style={{color: colors.text}}>{t('detailsScreen')}</Text>
			<Text style={{color: colors.text}}>{t('currentTheme', {theme})}</Text>
			<Text style={{color: colors.text}}>{t('currentLanguage', {language})}</Text>
			<Text style={{color: colors.text}}>{t('numberOfTodos', {count: todos.length})}</Text>
			<Button
				title={t('goBackToHome')}
				onPress={() => navigation.goBack()}
				color={colors.primary}
			/>
		</View>
	);
}

export default DetailsScreen;
