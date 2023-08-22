import {
	View,
	StyleSheet,
	SafeAreaView,
	FlatList,
	Pressable,
	Button,
} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Screens';

import SearchBar from '../components/SearchBar';
import ProfilCard from '../components/ProfilCard';
import ProfilPicture from '../components/ProfilPicture';
import { MyText } from '../components/MyText';
import { Colors } from '../constant/color';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
	const { logout, state } = useContext(AuthContext);

	const userProfileHandler = () => {
		if (state.logUser) {
			navigation.navigate('Profile', { login: state.logUser.login });
		}
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.headerContainer}>
				<View>
					<MyText style={styles.text}>Hey,</MyText>
					<MyText style={styles.title}>{state.logUser?.name}!</MyText>
				</View>
				{state.logUser && (
					<Pressable onPress={userProfileHandler}>
						<ProfilPicture user={state.logUser} />
					</Pressable>
				)}
			</View>
			<View style={styles.mainContainer}>
				<SearchBar />
			</View>
			<View style={styles.cardsContainer}>
				{state.usersList.length !== 0 ? (
					<FlatList
						data={state.usersList}
						renderItem={({ item }) => {
							return (
								<ProfilCard
									user={item}
									navigation={navigation}
								/>
							);
						}}
					></FlatList>
				) : (
					<View style={styles.noFoundContainer}>
						<MyText style={styles.noFoundText}>
							No User Found!
						</MyText>
					</View>
				)}
			</View>
			<View style={styles.logoutContaine}>
				<Pressable
					onPress={() => {
						logout();
					}}
				>
					<MaterialCommunityIcons
						name='logout'
						size={32}
						color='white'
					/>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default SearchScreen;

const styles = StyleSheet.create({
	text: {
		opacity: 0.5,
		fontSize: 18,
	},
	title: {
		fontSize: 24,
		fontFamily: 'DMSansBold',
		letterSpacing: -2,
	},
	headerContainer: {
		marginVertical: 36,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	mainContainer: {
		gap: 12,
		alignItems: 'center',
	},
	cardsContainer: {
		flex: 1,
		marginTop: 8,
	},
	noFoundContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.white,
		padding: 25,
		borderRadius: 20,
		marginTop: 30,
		elevation: 5,
	},
	noFoundText: {
		fontFamily: 'DMSansBold',
		fontSize: 18,
		letterSpacing: -1,
	},
	logoutContaine: {
		width: 50,
		height: 50,
		backgroundColor: Colors.gold,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		marginBottom: 25,
	}
});
