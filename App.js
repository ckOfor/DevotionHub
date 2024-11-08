import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Appearance} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import useStore from './src/store';
import {useThemeColors} from './src/hooks/useThemeColors';
import './src/i18n'; // Import i18n configuration

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
	const {setSystemTheme} = useStore();
	const colors = useThemeColors();
	
	useEffect(() => {
		const subscription = Appearance.addChangeListener(({colorScheme}) => {
			setSystemTheme(colorScheme);
		});
		
		return () => subscription.remove();
	}, [setSystemTheme]);
	
	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Home"
					screenOptions={{
						headerStyle: {
							backgroundColor: colors.background,
						},
						headerTintColor: colors.text,
					}}
				>
					<Stack.Screen name="Home" component={HomeScreen} options={{title: 'Todo App'}}/>
					<Stack.Screen name="Details" component={DetailsScreen} options={{title: 'Todo Details'}}/>
				</Stack.Navigator>
			</NavigationContainer>
		</QueryClientProvider>
	);
}
