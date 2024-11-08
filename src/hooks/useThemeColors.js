import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import useStore from '../store';
import { lightColors, darkColors } from '../theme/colors';

export const useThemeColors = () => {
	const { theme } = useStore();
	const systemColorScheme = useColorScheme();
	
	return useMemo(() => {
		if (theme === 'system') {
			return systemColorScheme === 'dark' ? darkColors : lightColors;
		}
		return theme === 'dark' ? darkColors : lightColors;
	}, [theme, systemColorScheme]);
};
