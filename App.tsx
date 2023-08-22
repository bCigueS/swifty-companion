import { useCallback } from 'react';

import * as SplashScreen from 'expo-splash-screen';
import * as Fonts from 'expo-font';

import AuthContextProvider from './context/AuthContextProvider';
import Screens from './pages/Screens';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded] = Fonts.useFonts({
		DMSansBold: require('./assets/fonts/DMSans-Bold.ttf'),
		DMSansRegular: require('./assets/fonts/DMSans-Regular.ttf'),
		DMSansELight: require('./assets/fonts/DMSans-ExtraLight.ttf'),
	});

	const onLayoutRootView = useCallback( async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded])
	if (!fontsLoaded) {
		return null;
	}

	return (
		<AuthContextProvider>
			<Screens onLayoutRootView={onLayoutRootView}/>
		</AuthContextProvider>
	);
}

