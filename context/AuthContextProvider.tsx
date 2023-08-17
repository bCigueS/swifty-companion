import axios from 'axios';
import {
	ReactNode,
	createContext,
	useEffect,
	useMemo,
	useReducer,
	useState,
} from 'react';
import { UID, SECRET, REDIRECT_URI } from '@env';
import * as SecureStore from 'expo-secure-store';

interface AuthContextProps {
	children: ReactNode;
}

interface AuthState {
	userToken: string | null;
	isSignout: boolean;
	isLoading: boolean;
	logUser: User | null;
}

export interface User {
	login: string,
	name: string,
	avatar: string,
	level: number,
}

const initialState = {
	userToken: null,
	isSignout: false,
	isLoading: true,
	logUser: null,
};

type AuthAction =
	| { type: 'RESTORE_TOKEN'; payload: string | null }
	| { type: 'SIGN_IN'; payload: string }
	| { type: 'USER_LOG'; payload: User}
	| { type: 'SIGN_OUT' };

const TOKEN_URL = 'https://api.intra.42.fr/oauth/token';

export const AuthContext = createContext<{
	login: (code: string) => void;
	logout: () => void;
	tokenInfo: () => void;
	getMe: () => void;
	state: AuthState;
	dispatch: React.Dispatch<any>;
}>({
	login: (code: string) => {},
	logout: () => {},
	tokenInfo: () => {},
	getMe: () => {},
	state: initialState,
	dispatch: () => null,
});

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
	const appReducer = (state: AuthState, action: AuthAction): AuthState => {
		switch (action.type) {
			case 'RESTORE_TOKEN':
				return {
					...state,
					userToken: action.payload,
					isLoading: false,
				};
			case 'SIGN_IN':
				return {
					...state,
					isSignout: false,
					userToken: action.payload,
				};
			case 'SIGN_OUT':
				return {
					...state,
					isSignout: true,
					userToken: null,
				};
			case 'USER_LOG': 
				return {
					...state,
					logUser: action.payload,
				}
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(appReducer, initialState);

	useEffect(() => {
		const bootstrapAsync = async () => {
			let userToken;
			try {
				userToken = await refreshToken();
			} catch (error: any) {
				console.error(error);
			}
			if (userToken) {
				dispatch({ type: 'RESTORE_TOKEN', payload: userToken });
			}
		};
		bootstrapAsync();
	}, []);


	const tokenNeedRefresh = async () => {
		const tokenInfo = await SecureStore.getItemAsync('userToken');
		const date: number = Math.round(Date.now() / 1000);
		if (tokenInfo) {
			const { expires_in, created_at } = JSON.parse(tokenInfo);
			const expiresIn = parseInt(expires_in) + parseInt(created_at);
			if (expiresIn - date <= 100) {
				return true;
			} else {
				return false;
			}
		}
	};

	const getTokenInfo = async (type: string) => {
		const tokenInfo = await SecureStore.getItemAsync('userToken');
		if (tokenInfo) {
			const { access_token, refresh_token } = JSON.parse(tokenInfo);
			switch (type) {
				case 'ACCESS':
					return access_token;
				case 'REFRESH':
					return refresh_token;
				default:
					throw new Error('Failed to fetch token info');
			}
		}
	};

	const refreshToken = async () => {
		try {
			const needRefresh = await tokenNeedRefresh()
			if (!needRefresh) {
				return await getTokenInfo('ACCESS');
			} else {
				const refresh_token = await getTokenInfo('REFRESH');

				const response = await axios.post(TOKEN_URL, {
					grant_type: 'refresh_token',
					client_id: UID,
					client_secret: SECRET,
					refresh_token: refresh_token,
				});
				const token = JSON.stringify(response.data);
				await SecureStore.setItemAsync('userToken', token);
				dispatch({
					type: 'RESTORE_TOKEN',
					payload: response.data.access_token,
				})
				return response.data.access_token;
			}
		} catch (error: any) {
			console.error(error);
		}
	};
	

	const authContext = useMemo(
		() => ({
			login: async (code: string) => {
				try {
					const response = await axios.post(TOKEN_URL, {
						grant_type: 'authorization_code',
						client_id: UID,
						client_secret: SECRET,
						code: code,
						redirect_uri: REDIRECT_URI,
					});
					const token = JSON.stringify(response.data);
					await SecureStore.setItemAsync('userToken', token);
					dispatch({
						type: 'SIGN_IN',
						payload: response.data.access_token,
					});
				} catch (error: any) {
					console.error(error);
				}
			},

			logout: async () => {
				await SecureStore.deleteItemAsync('userToken');
				dispatch({ type: 'SIGN_OUT' });
			},
			tokenInfo: async () => {
				try {
					const response = await axios.get(
						'https://api.intra.42.fr/oauth/token/info',
						{
							headers: {
								Authorization: `Bearer ${state.userToken}`,
							},
						}
					);
				} catch (error: any) {
					console.error(error);
				}
			},
			getMe: async () => {
				try {
					const tokenInfo = await SecureStore.getItemAsync(
						'userToken'
					);
					if (tokenInfo) {
						const { access_token: token } = JSON.parse(tokenInfo);
						const response = await axios.get(
							'https://api.intra.42.fr/v2/users/sbeylot',
							{
								headers: {
									Authorization: `Bearer ${token}`,
								},
							}
						);
						const data = response.data;
						console.log(response.data);
						const logUser: User = {
							login: data.login,
							name: data.displayname,
							avatar: data.image.versions.small,
							level: data.cursus_users.pop().level,
						}
						console.log(logUser);
						dispatch({type: 'USER_LOG', payload: logUser})
					}
				} catch (error: any) {
					console.error(error.message);
				}
			},
			state,
			dispatch,
		}),
		[state]
	);


	return (
		<AuthContext.Provider value={authContext}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
