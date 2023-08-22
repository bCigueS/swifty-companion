import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Colors } from '../constant/color';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import { SimpleLineIcons } from '@expo/vector-icons';

const SearchBar = () => {
	const [userInput, setUserInput] = useState<string>('');
	const { getUsersList } = useContext(AuthContext);

	const searchHandler = async () => {
		await getUsersList(userInput);
	};

	const userInputHandler = (input: string) => {
		setUserInput(input);
	};

	return (
		<View style={styles.container}>
			<Pressable onPress={searchHandler}>
				<View style={styles.glass}>
					<SimpleLineIcons
						name='magnifier'
						size={20}
						color={Colors.white}
					/>
				</View>
			</Pressable>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.inputUser}
					placeholder='Search 42 User'
					onChangeText={userInputHandler}
					onSubmitEditing={searchHandler}
					autoCapitalize='none'
					autoCorrect= {false}
					returnKeyType='done'
				/>
			</View>
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
		paddingHorizontal: 24,
		height: 64,
		width: '100%',
		borderRadius: 16,
		backgroundColor: Colors.white,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		elevation: 10,
	},
	inputContainer: {
		// backgroundColor: 'red',
		marginHorizontal: 16,
		flex: 1,
	},
	glass: {
		height: 40,
		width: 40,
		borderRadius: 20,
		backgroundColor: Colors.gold,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
	},
	inputUser: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		fontFamily: 'DMSansRegular',
	},
});
