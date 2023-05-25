import { getDatabase, ref, set, child, get } from 'firebase/database';

export const setUserOnDatabase = ({ uid, reloadUserInfo }) => {
	const db = getDatabase();
	let { email } = reloadUserInfo;

	set(ref(db, 'users/' + uid), {
		uid,
		email,
		role: 'passenger',
		flights: '',
	});
};

export const getUserFromDatabase = (uid) => {
	const dbRef = ref(getDatabase());

	return get(child(dbRef, `users/${uid}`))
		.then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			} else {
			}
		})
		.catch((error) => {
			console.error(error);
		});
};
