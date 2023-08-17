import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import SearchBar from '../components/SearchBar';
import PrimaryButton from '../components/PrimaryButton';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import ProfilCard from '../components/ProfilCard';
const SearchScreen = () => {
	const { logout, getMe, tokenInfo } = useContext(AuthContext);
	const onPressHandler = () => {
		logout();
	};

	const getMeHandler = () => {
		getMe();
	};

	const getTokenInfoHandler = () => {
		tokenInfo();
	};
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.mainContainer}>
				<SearchBar />
				{/* <Text>Coucou</Text> */}
				<PrimaryButton onPress={onPressHandler}>Login</PrimaryButton>
				<PrimaryButton onPress={getMeHandler}>Get Me</PrimaryButton>
				<PrimaryButton onPress={getTokenInfoHandler}>
					Token info
				</PrimaryButton>
				<ProfilCard />
			</View>
		</SafeAreaView>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 24,
	},
	mainContainer: {
		gap: 32,
		flex: 1,
		alignItems: 'center',
		margin: 32,
		// borderColor: 'red',
		// borderWidth: 8,
	},
});
