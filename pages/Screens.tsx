import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { AuthContext, User } from '../context/AuthContextProvider';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import SearchScreen from './Search';
import Profile from './Profile';

export type RootStackParamList = {
	Search: undefined;
	Profile: { login: string };
	Login: undefined;
};

interface ScreenProps {
	onLayoutRootView: () => Promise<void>;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Screens: React.FC<ScreenProps> = ({ onLayoutRootView }) => {
	const authCtx = useContext(AuthContext);

	return (
		<View style={styles.appContainer} onLayout={onLayoutRootView}>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
						contentStyle: styles.contentContainer,
					}}
				>
					{authCtx.state.userToken === null ? (
						<Stack.Screen
							key='Login'
							name='Login'
							component={Login}
						/>
					) : (
						<>
							<Stack.Screen
								key='Search'
								name='Search'
								component={SearchScreen}
							/>
							<Stack.Screen
								key='Profile'
								name='Profile'
								component={Profile}
								initialParams={{
									login: authCtx.state.logUser?.login,
								}}
								options={{
									headerShown: true,
									headerTransparent: true,
									headerTitleStyle: {
										fontFamily: 'DMSansBold',
										fontSize: 24,
									},
								}}
							/>
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
};

export default Screens;

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		backgroundColor: '#F1F8FF',
	},
	contentContainer: {
		paddingHorizontal: 32,
		paddingTop: 20,
		backgroundColor: '#F1F8FF',
	},
});


