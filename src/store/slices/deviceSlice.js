import { Appearance } from 'react-native';
import i18n from '../../i18n';

const createDeviceSlice = (set) => ({
	theme: 'system',
	systemTheme: Appearance.getColorScheme() || 'light',
	language: 'en',
	setTheme: (theme) => set({ theme }),
	setSystemTheme: (systemTheme) => set({ systemTheme }),
	setLanguage: (language) => {
		i18n.changeLanguage(language);
		set({ language });
	},
});

export default createDeviceSlice;
