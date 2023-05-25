import { getDatabase, ref, child, get, set, remove } from 'firebase/database';

let SET_FLIGHTS = 'flights-reducer/SET_FLIGHTS';
let SET_ACTIVE_FLIGHTS = 'flights-reducer/SET_ACTIVE_FLIGHTS';
let TOGGLE_FETCHED_NEW_FLIGHT = 'flights-reducer/TOGGLE_FETCHED_NEW_FLIGHT';
let SET_ORDERED_FLIGHTS = 'flights-reducer/SET_ORDERED_FLIGHTS';

const initState = {
	flights: [],
	activeFlights: [],
	orderedFlights: [],
	maxFlights: 9,
	fetchedNewFlight: false,
};

const flightsReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_FLIGHTS:
			return {
				...state,
				flights: [...action.flights],
			};

		case SET_ACTIVE_FLIGHTS:
			return {
				...state,
				activeFlights: [...action.flights],
			};

		case TOGGLE_FETCHED_NEW_FLIGHT:
			return {
				...state,
				fetchedNewFlight: !state.fetchedNewFlight,
			};

		case SET_ORDERED_FLIGHTS:
			return {
				...state,
				orderedFlights: [...action.flight],
			};

		default:
			return state;
	}
};

export const setFlights = (flights) => ({
	type: SET_FLIGHTS,
	flights,
});
export const setActiveFlights = (flights) => ({
	type: SET_ACTIVE_FLIGHTS,
	flights,
});
export const toggleFetchedNewFlight = () => ({
	type: TOGGLE_FETCHED_NEW_FLIGHT,
});
export const setOrderedFlights = (flight) => ({
	type: SET_ORDERED_FLIGHTS,
	flight,
});

export const fetchFlights = () => (dispatch, getState) => {
	let getFlightsData = async () => {
		const dbRef = ref(getDatabase());

		return get(child(dbRef, `flights`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					let value = snapshot.val();
					dispatch(setFlights(Object.values(value)));
					dispatch(setActiveFlights(Object.values(value)));
				} else {
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
	getFlightsData();
};

export const setFlightOnDatabase =
	({ id, date, timeFrom, timeTo, from, to, carNumber, driver, seats = '0', maxSeats, cost }) =>
	(dispatch, getState) => {
		const db = getDatabase();

		set(ref(db, 'flights/' + id), {
			id,
			date,
			timeFrom,
			timeTo,
			place: {
				from,
				to,
			},
			carNumber,
			driver,
			seats: {
				maxSeats,
				seats,
			},
			cost,
		}).then((response) => {
			dispatch(toggleFetchedNewFlight());
			setTimeout(() => {
				dispatch(toggleFetchedNewFlight());
			}, 1000);
		});
	};

export const getOrderedFlights = (flights) => (dispatch, getState) => {
	let getFlightsData = async () => {
		const dbRef = ref(getDatabase());
		let arr = [];
		console.log(flights);

		flights.forEach((flight, index) => {
			return get(child(dbRef, `flights/${flight.id}`))
				.then((snapshot) => {
					if (snapshot.exists()) {
						let value = snapshot.val();
						arr.push(value);

						if (flights[flights.length - 1] === flight) {
							dispatch(setOrderedFlights(arr));
						}
					} else {
						console.log('netu');
					}
				})
				.catch((error) => {
					console.error('netu');
				});
		});
	};
	getFlightsData();
};

export const removeFlight = (id) => (dispatch, getState) => {
	let getFlightsData = async () => {
		const dbRef = ref(getDatabase());
		let arr = [];

		remove(child(dbRef, `flights/${id}`))
			.then((snapshot) => {
				dispatch(fetchFlights());
			})
			.catch((error) => {
				console.error(error);
			});
	};
	getFlightsData();
};
export default flightsReducer;
