import { View, Image } from 'react-native';
import { User } from '../context/AuthContextProvider';

interface ProfilPicProps {
	user: User;
	size?: { width: number; height: number };
}

const defaultPicture = require('../assets/default.jpg');

const ProfilPicture: React.FC<ProfilPicProps> = ({
	user,
	size = { width: 100, height: 100 },
}) => {

	return (
		<View>
			<Image
				style={{ width: size.width, height: size.height, borderRadius: 50 }}
				source={user?.avatar ? {uri: user?.avatar} : defaultPicture}
			/>
		</View>
	);
};

export default ProfilPicture;
