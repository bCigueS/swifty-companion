import React, { ReactNode, useContext } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./Login";
import { AuthContext } from "../context/AuthContextProvider";
import SearchScreen from "./Search";


const Stack = createNativeStackNavigator();

const Screens: React.FC = () => {
	const authCtx = useContext(AuthContext);
	return (
		<NavigationContainer>
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{/* <Stack.Screen name="Login" component={Login} /> */}
			{ authCtx.state.userToken === null ? (
				<Stack.Screen name='Login' component={Login} />
			) : (
				<Stack.Screen
					name='SearchScreen'
					component={SearchScreen}
				/>
			)}
		</Stack.Navigator>
	</NavigationContainer>
	)
}

export default Screens;