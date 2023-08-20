import { Colors } from '../constant/color';
import { View, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import LogoSchool from '../assets/42_Logo.svg';
import { DiscoveryDocument, useAuthRequest } from 'expo-auth-session';

import * as WebBrowser from 'expo-web-browser';

import { UID, REDIRECT_URI } from '@env';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import { MyText } from '../components/MyText';


WebBrowser.maybeCompleteAuthSession();

const Login = () => {

	const authCtx = useContext(AuthContext);
	const discovery: DiscoveryDocument = {
		authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize',
	};

	const [request, response, promptAsync] = useAuthRequest(
		{ clientId: UID, redirectUri: REDIRECT_URI },
		discovery
	);

	console.log(REDIRECT_URI);

	const onPressHandler = async() => {
		const response = await promptAsync();
		if (response.type === 'success') {
			await authCtx.login(response.params.code);
		}

	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.mainContainer}>
				<View style={styles.infoContainer}>
					<MyText>Login</MyText>
					<MyText>Login with 42</MyText>
				</View>
				<Pressable style={styles.loginButton} onPress={onPressHandler}>
					<LogoSchool height="40" width="40" fill='white' />
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
		justifyContent: 'center',
		paddingHorizontal: 16,
	},
	mainContainer: {
		gap: 32,
		marginHorizontal: 12,
		padding: 24,
		borderRadius: 16,
		borderColor: Colors.black,
		borderWidth: 2,
		backgroundColor: Colors.white,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	infoContainer: {
		gap: 18,
	},
	loginButton: {
		padding: 12,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.green,
	},
});
