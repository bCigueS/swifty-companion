import { AuthContext, User } from '../context/AuthContextProvider';
import { Colors } from '../constant/color';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useContext } from 'react';
import Title from './Title';

const ProfilCard = () => {
	const { state } = useContext(AuthContext);
	const user: User | null = state.logUser;
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: user?.avatar }} />
			<View style={styles.nameContainer} >
				<Title>{user?.name}</Title>
				<Text>{user?.login}</Text>
				<Text>{user?.level}</Text>
			</View>
		</View>
	);
};

export default ProfilCard;

const styles = StyleSheet.create({
	container: {
		borderColor: Colors.black,
		borderWidth: 2,
		padding: 24,
		borderRadius: 18,
		backgroundColor: Colors.white,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 16,
		width: '100%',
	},
	nameContainer: {
	},
	image: {
		borderRadius: 40,
		width: 80,
		height: 80,
	},
});
