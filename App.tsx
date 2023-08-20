import { StyleSheet } from 'react-native';
import { useEffect } from 'react';

import * as SplashScreen from 'expo-splash-screen';
import * as Fonts from 'expo-font';

import AuthContextProvider from './context/AuthContextProvider';
import Screens from './pages/Screens';

export default function App() {
	const [fontsLoaded] = Fonts.useFonts({
		DMSansBold: require('./assets/fonts/DMSans-Bold.ttf'),
		DMSansRegular: require('./assets/fonts/DMSans-Regular.ttf'),
		DMSansELight: require('./assets/fonts/DMSans-ExtraLight.ttf'),
	});

	if (fontsLoaded) {
		SplashScreen.hideAsync();
	}

	useEffect(() => {
		const prepare = async () => {
			await SplashScreen.preventAutoHideAsync();
		};

		prepare();
	}, []);

	return (
		<AuthContextProvider>
			<Screens />
		</AuthContextProvider>
	);
}

