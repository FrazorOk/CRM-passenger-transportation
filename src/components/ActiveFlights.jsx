import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFlights } from '../store/user-reducer';
import { getOrderedFlights } from '../store/flights-reducer';
import { Row } from 'react-bootstrap';
import FlightCard from './FlightCard';

const ActiveFlights = () => {
	let dispatch = useDispatch();
	let userFlights = useSelector((state) => state.user.userData.flights);
	let orderedFlights = useSelector((state) => state.flights.orderedFlights);

	useEffect(() => {
		dispatch(getUserFlights());
	}, []);

	useEffect(() => {
		dispatch(getOrderedFlights(userFlights));
	}, [userFlights]);

	return (
		<Row xs={1} md={3} className="g-4 mt-2">
			{orderedFlights.map((flight, index) => {
				return <FlightCard flight={flight} key={index} btn={false} />;
			})}
		</Row>
	);
};
export default ActiveFlights;
