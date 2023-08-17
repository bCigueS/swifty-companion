import { Colors } from '../constant/color';
import { ReactNode } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';

interface ButtonProps {
	children: ReactNode,
	onPress?: () => void,
}

const PrimaryButton: React.FC<ButtonProps> = ({ children, onPress }) => {
	return (
		<View style={styles.container}>
			<Pressable
				android_ripple={{ color: Colors.goldRipple }}
				style={({pressed}) => pressed ? [styles.pressedItem, styles.buttonContainer] : styles.buttonContainer }
				onPress={onPress}
			>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</View>
	);
};

export default PrimaryButton;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingVertical: 18,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: Colors.gold,
		borderColor: Colors.black,
		borderWidth: 2,
		overflow: 'hidden',
	},
	buttonContainer: {},
	buttonText: {
		color: Colors.black,
		fontWeight: 'bold',
		fontSize: 16,
	},
	pressedItem: {
		opacity: 0.5,
	},
});
