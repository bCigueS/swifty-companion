import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './Screens';
import { MyText } from '../components/MyText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, FlatList } from 'react-native';
import ProfilPicture from '../components/ProfilPicture';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import { Colors } from '../constant/color';

export type ProfileScreenProps = NativeStackScreenProps<
	RootStackParamList,
	'Profile'
>;

interface ProjectInfo {
	finalMark: number;
	name: string;
	validated: boolean;
	status: string;
}

interface DisplayUserInfo {
	login: string;
	name: string;
	avatar?: string;
	level: string;
	levelPourcentage: string;
	location: string;
	evaluation: number;
	cursus: string;
	lastCursus: number;
	projects: ProjectInfo[];
}

const Profile: React.FC<ProfileScreenProps> = ({ route, navigation }) => {
	const { login } = route.params;
	const { state } = useContext(AuthContext);
	const [user, setUser] = useState<DisplayUserInfo | undefined>(undefined);

	useEffect(() => {

		const extractProjectsInfo = (projects: any, lastCursus: number) => {
			const userProjects: [] = projects.filter((item: any) => {
				return lastCursus === item.cursus_ids[0];
			});

			const formatProjects: ProjectInfo[] = userProjects.map((item: any) => {
				const projectInfo: ProjectInfo = {
					name: item.project.name.length <= 18 ? item.project.name : (item.project.name.slice(0, 18) + '...'),
					finalMark: item.final_mark,
					validated: item['validated?'],
					status: item.status,
				};
				return projectInfo;
			})
			return formatProjects;
		}


		const getUserInfo = async () => {
			try {
				const response = await axios.get(
					`https://api.intra.42.fr/v2/users/${login}`,
					{
						headers: {
							Authorization: `Bearer ${state.userToken}`,
						},
					}
				);
				if (response.status !== 200) {
					throw new Error('Failed to fetch User');
				}
				const data = response.data;

				const lastCursus = data.cursus_users.pop();
				const [level, pourcentage] = lastCursus.level
					.toString()
					.split('.');
				const cursusName = lastCursus.cursus.name;
				const userProjects = extractProjectsInfo(data.projects_users, lastCursus.cursus_id);

				const user: DisplayUserInfo = {
					login: data.login,
					name: data.displayname,
					avatar: data.image.versions.small
						? data.image.versions.small
						: undefined,
					level: level ? level : 0,
					levelPourcentage: pourcentage,
					location: data.location ? data.location : 'Unavailable',
					evaluation: data.correction_point,
					cursus: cursusName,
					lastCursus: lastCursus.cursus_id,
					projects: userProjects,
				};
				setUser(user);

			} catch (error: any) {
				console.error(error);
			}
		};
		getUserInfo();

	}, []);

	
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.headerContainer}>
				<ProfilPicture avatar={user?.avatar} />
				<MyText style={styles.headerName}>{user?.name}</MyText>
				<View style={styles.progressBar}>
					{user && (
						<View
							style={[
								styles.progressBarInside,
								{
									width: `${parseInt(
										user?.levelPourcentage
									)}%`,
									alignSelf: 'flex-start',
								},
							]}
						></View>
					)}
					<MyText>
						Level: {user?.level} - {user?.levelPourcentage}%
					</MyText>
				</View>

				<View style={styles.statsContainer}>
					<View style={styles.statContainer}>
						<MyText style={styles.statTitle}>Location</MyText>
						<MyText style={styles.statText}>
							{user?.location}
						</MyText>
					</View>
					<View style={styles.statContainer}>
						<MyText style={styles.statTitle}>Evaluation</MyText>
						<MyText style={styles.statText}>
							{user?.evaluation}
						</MyText>
					</View>
					<View style={styles.statContainer}>
						<MyText style={styles.statTitle}>Cursus</MyText>
						<MyText style={styles.statText}>{user?.cursus}</MyText>
					</View>
				</View>
			</View>
			<View style={styles.projectsContainer}>
				<FlatList data={user?.projects} renderItem={({ item }) => {
					return <View style={styles.projectContainer}>
						<MyText style={styles.projectName}>{item.name}</MyText>
						<MyText style={[styles.projectMark, item.validated ? {color: 'green'} : {color: 'red'}]}>{item.status === 'finished' ? item.finalMark : 'In-Progress'}</MyText>
					</View>
				} }>
					
				</FlatList>
			</View>
		</SafeAreaView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	headerContainer: {
		marginVertical: 30,
		gap: 10,
		justifyContent: 'center',
		backgroundColor: Colors.white,
		alignItems: 'center',
		elevation: 14,
		padding: 30,
		borderRadius: 15,
	},
	headerName: {
		fontSize: 24,
		fontFamily: 'DMSansBold',
		letterSpacing: -1,
	},
	statsContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	statContainer: {
		alignItems: 'center',
		gap: 8,
	},
	statTitle: {
		fontSize: 14,
		opacity: 0.45,
	},
	statText: {
		fontFamily: 'DMSansBold',
		fontSize: 16,
	},
	progressBar: {
		height: 50,
		overflow: 'hidden',
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		borderRadius: 20,
		backgroundColor: Colors.background,
		borderWidth: 2,
		elevation: 10,
	},
	progressBarInside: {
		height: '100%',
		position: 'absolute',
		backgroundColor: Colors.gold,
	},
	projectsContainer: {
		flex: 1,
	},
	projectContainer: {
		width: '100%',
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: Colors.white,
		borderRadius: 20,
		borderColor: Colors.black,
		borderWidth: 2,
		elevation: 2,
	},
	projectName: {
		fontFamily: 'DMSansBold',
		fontSize: 18,
	},
	projectMark: {
		fontFamily: 'DMSansBold',
		fontSize: 16,
	}
});
