import { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../constant/color';

interface TitleProps {
	children: ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
	return <Text style={styles.text}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		color: Colors.black,
		fontWeight: 'bold',
	},
});
