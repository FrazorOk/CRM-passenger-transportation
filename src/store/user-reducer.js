import { child, get, getDatabase, ref, set, update } from 'firebase/database';
import { fetchFlights } from './flights-reducer';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getUserFromDatabase, setUserOnDatabase } from '../api/datebase';

let SET_USER = 'user-reducer/SET_USER';
let SET_USER_DATA = 'user-reducer/SET_USER_DATA';
let RESET_USER = 'user-reducer/RESET_USER';
let SET_USER_ROLE = 'user-reducer/SET_USER_ROLE';
let SET_USER_FLIGHTS = 'user-reducer/SET_USER_FLIGHTS';

const initState = {
	user: null,
	userData: {
		role: '',
		flights: [],
	},
};

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.user,
			};

		case SET_USER_DATA:
			if (action.data.flights) {
				return {
					...state,
					userData: {
						...action.data,
						flights: [...Object.values(action.data.flights)],
					},
				};
			} else {
				return {
					...state,
					userData: {
						...action.data,
					},
				};
			}

		case RESET_USER:
			return {
				...state,
				user: null,
				userData: {
					role: '',
				},
			};

		case SET_USER_ROLE:
			return {
				...state,
				userData: {
					...state.userData,
					role: action.role,
				},
			};

		case SET_USER_FLIGHTS:
			return {
				...state,
				userData: {
					...state.userData,
					flights: [...action.flights],
				},
			};

		default:
			return state;
	}
};

export const setUser = (user) => ({
	type: SET_USER,
	user,
});

export const setUserData = (data) => ({
	type: SET_USER_DATA,
	data,
});

export const resetUser = () => ({
	type: RESET_USER,
});

export const setUserRole = (role) => ({
	type: SET_USER_ROLE,
	role,
});

export const setUserFlights = (flights) => ({
	type: SET_USER_FLIGHTS,
	flights,
});

// thunks
export const authFromProvider = (provider, credential) => (dispatch, getState) => {
	const auth = getAuth();
	signInWithPopup(auth, provider)
		.then((result) => {
			credential(result);
			const user = result.user;

			getUserFromDatabase(user.uid).then((response) => {
				if (response) {
					dispatch(setUser(user));
				} else {
					let setsUser = async () => {
						let setDataBase = await setUserOnDatabase(user);
						let setUserInState = await dispatch(setUser(user));
					};
					setsUser();
				}
			});
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.customData.email;
			const credential = GoogleAuthProvider.credentialFromError(error);
		});
};

export const fetchUserRole = (role) => (dispatch, getState) => {
	let setUserRoleData = async () => {
		let state = getState().user.user.uid;

		const db = getDatabase();
		let userData = await update(ref(db, 'users/' + state), {
			role: role,
		}).then(() => {
			dispatch(setUserRole(role));
		});
	};
	setUserRoleData();
};

export const setUserFlightsOnDataBase = (flight, seats) => (dispatch, getState) => {
	let setUserRoleData = async () => {
		let state = getState().user.user.uid;

		const db = getDatabase();
		let userData = await set(ref(db, `users/${state}/flights/${flight}`), {
			id: flight,
		}).then(() => {});

		if (seats.maxSeats > seats.seats) {
			let updateSeats = await update(ref(db, `flights/${flight}/seats/`), {
				seats: parseInt(seats.seats) + 1,
			}).then(() => {
				dispatch(fetchFlights());
			});
		}
	};
	setUserRoleData();
};

export const getUserFlights = () => (dispatch, getState) => {
	let getFlightsData = async () => {
		const dbRef = ref(getDatabase());
		let user = getState().user.user.uid;

		return get(child(dbRef, `users/${user}/flights`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					let value = snapshot.val();

					dispatch(setUserFlights(Object.values(value)));
				} else {
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
	getFlightsData();
};

export default userReducer;
