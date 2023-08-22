import { User } from '../context/AuthContextProvider';
import { StyleSheet, View, Pressable } from 'react-native';
import { MyText } from './MyText';
import ProfilPicture from './ProfilPicture';
import { useNavigation } from '@react-navigation/native';
import { ProfileScreenProps } from 'pages/Profile';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'pages/Screens';

interface ProfilCardProps {
	user: User;
	navigation: NativeStackNavigationProp<RootStackParamList, "Search">;
}

const ProfilCard: React.FC<ProfilCardProps> = ({ user, navigation }) => {


	return (
		<View style={styles.container}>
			<Pressable onPress={() => navigation.navigate('Profile', {login: user.login})}>
				<View style={styles.infoContainer}>
					<View style={styles.imageContainer}>
						<ProfilPicture
							user={user}
							size={{ width: 75, height: 75 }}
						/>
					</View>
					<View style={styles.nameContainer}>
						<MyText style={styles.name}>{user?.name}</MyText>
						<MyText style={styles.login}>{user?.login}</MyText>
					</View>
				</View>
			</Pressable>
		</View>
	);
};

export default ProfilCard;

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	infoContainer: {
		flexDirection: 'row',
	},
	nameContainer: {
		justifyContent: 'center',
	},
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		marginRight: 12,
	},
	name: {
		fontSize: 18,
		fontFamily: 'DMSansBold',
		letterSpacing: -1,
	},
	login: {
		opacity: 0.45,
	},
});
