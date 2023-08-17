import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { Colors } from '../constant/color';
import PrimaryButton from './PrimaryButton';

const SearchBar = () => {
	return (
		<View style={styles.container}>
			<Entypo name='magnifying-glass' size={24} color={Colors.gold} />
			<View style={styles.inputContainer}>
				<TextInput style={styles.inputUser} placeholder='Search 42 User'/>
			</View>
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
		paddingHorizontal: 24,
		// height: 64,
		width: '100%',
		borderRadius: 32,
		backgroundColor: Colors.white,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: Colors.black,
		borderWidth: 2,
	},
	inputContainer: {
		// backgroundColor: 'red',
		marginHorizontal: 16,
		flex:1,
	},
	inputUser: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})