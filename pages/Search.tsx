import {
	View,
	StyleSheet,
	SafeAreaView,
	FlatList,
	Pressable,
} from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Screens';


import SearchBar from '../components/SearchBar';
import ProfilCard from '../components/ProfilCard';
import ProfilPicture from '../components/ProfilPicture';
import { MyText } from '../components/MyText';

type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
	const { logout, state } = useContext(AuthContext);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.headerContainer}>
				<View>
					<MyText style={styles.text}>Hey,</MyText>
					<MyText style={styles.title}>{state.logUser?.name}!</MyText>
				</View>
				{state.logUser && (
					<Pressable onPress={() => navigation.push('Profile')}>
						<ProfilPicture user={state.logUser} />
					</Pressable>
				)}
			</View>
			<View style={styles.mainContainer}>
				<SearchBar />
			</View>
			<View style={styles.cardsContainer}>
				<FlatList
					data={state.usersList}
					renderItem={({ item }) => {
						return <ProfilCard user={item} />;
					}}
				></FlatList>
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
});
