import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import { AuthContext } from '../context/AuthContextProvider';
import SearchScreen from './Search';
import { View, StyleSheet } from 'react-native';
import BottomTabs from '../components/BottomTabs';
import Profile from './Profile';

export type RootStackParamList = {
	Search: undefined;
	Profile: undefined;
	Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Screens: React.FC = () => {
	const authCtx = useContext(AuthContext);
	return (
		<View style={styles.appContainer}>
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
							/>
						</>
					)}
				</Stack.Navigator>
				{authCtx.state.userToken && <BottomTabs navigation={Stack.Navigator} />}
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
		paddingTop: 50,
		backgroundColor: '#F1F8FF',
	},
});
