import { ReactNode } from 'react';
import { Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface TextProps {
	children: ReactNode,
	style?: StyleProp<TextStyle>
}

export const MyText: React.FC<TextProps> = ({children, style}) => {
	return <Text style={[styles.text, style]}>{children}</Text>;
};


const styles = StyleSheet.create({
	text: {
		fontFamily: 'DMSansRegular',
	}
})