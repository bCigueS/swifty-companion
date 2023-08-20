import { View, StyleSheet, Pressable } from 'react-native';
import { MyText } from './MyText';
import { Colors } from '../constant/color';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';

interface BottomTabsProps {
	navigation: any;
}

const BottomTabs: React.FC<BottomTabsProps> = ({ navigation }) => {
	const { logout } = useContext(AuthContext);

	const handleNavigation = (screenName: string) => {
		navigation.navigate(screenName);
	}
	return (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				<Pressable onPress={() => handleNavigation('Search')}>
					<SimpleLineIcons
						name='magnifier'
						size={20}
						color={Colors.white}
					/>
				</Pressable>
			</View>
			<View style={styles.iconContainer}>
				<Pressable onPress={() => navigation.navigate('Profile')}>
					<AntDesign name='user' size={20} color={Colors.white} />
				</Pressable>
			</View>
			<View style={styles.iconContainer}>
				<Pressable onPress={logout}>
					<SimpleLineIcons
						name='logout'
						size={20}
						color={Colors.white}
					/>
				</Pressable>
			</View>
		</View>
	);
};

export default BottomTabs;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 20,
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		backgroundColor: Colors.white,
		elevation: 10,
		marginHorizontal: 20,
	},
	iconContainer: {
		gap: 15,
		backgroundColor: Colors.gold,
		borderRadius: 20,
		height: 40,
		width: 40,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
	},
});
