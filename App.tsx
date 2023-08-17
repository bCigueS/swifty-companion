// import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useContext, useEffect } from 'react';

import * as SplashScreen from 'expo-splash-screen';
import * as Fonts from 'expo-font';

import AuthContextProvider, {
	AuthContext,
} from './context/AuthContextProvider';
import Screens from './pages/Screens';

export default function App() {
	const authCtx = useContext(AuthContext);

	const [fontsLoaded] = Fonts.useFonts({
		SpaceMonoR: require('./assets/fonts/SpaceMono-Regular.ttf'),
		SpaceMonoB: require('./assets/fonts/SpaceMono-Bold.ttf'),
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
