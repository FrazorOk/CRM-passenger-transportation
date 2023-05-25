import { useEffect, useState } from 'react';
import { fetchFlights } from '../store/flights-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';
import FlightCard from './FlightCard';
import FlightsPagination from './FlightsPagination';
import FlightsSort from './FlightsSort';
import { sortingFlights } from '../helpers/filterFlights';
import FilghtsTable from './FilghtsTable';

const Flights = () => {
	const dispatch = useDispatch();
	let flights = useSelector((state) => state.flights.activeFlights);
	let maxFlights = useSelector((state) => state.flights.maxFlights);
	let role = useSelector((state) => state.user.userData.role);

	let [pageActiveFlights, setPageActiveFlights] = useState(1);
	let [maxPagination, setMaxPagination] = useState(0);
	let [sortOptions, setSortOptions] = useState(2);

	let [sortedFlights, setSortedFlights] = useState([]);
	let [flightsArr, setFlightsArr] = useState([]);

	let setFlightsEffect = () => {
		let lastNumber = pageActiveFlights * maxFlights;
		let firstNumber = lastNumber - maxFlights;

		setFlightsArr((flightsArr = sortingFlights(sortedFlights, sortOptions).slice(firstNumber, lastNumber)));
		setMaxPagination((maxPagination = Math.ceil(sortedFlights.length / maxFlights)));
	};

	useEffect(() => {
		dispatch(fetchFlights());
		setSortedFlights((sortedFlights = sortingFlights(flights, sortOptions)));
	}, []);

	useEffect(() => {
		setSortedFlights((sortedFlights = sortingFlights(flights, sortOptions)));
	}, [flights]);

	useEffect(() => {
		setFlightsEffect();
	}, [sortOptions]);

	useEffect(() => {
		setFlightsEffect();
	}, [pageActiveFlights, sortedFlights, fetch]);

	return (
		<>
			<Row>
				<FlightsSort xs={1} md={3} setSortOptions={setSortOptions} setSortedFlights={setSortedFlights} />
			</Row>
			<Row xs={1} md={3} className="g-4 mt-2">
				{role === 'Диспетчер' || role === 'dispatcher' ? (
					<FilghtsTable flights={flightsArr} pageActiveFlights={pageActiveFlights} maxFlights={maxFlights} />
				) : (
					flightsArr.map((flight, index) => {
						return <FlightCard flight={flight} key={index} />;
					})
				)}
			</Row>
			<Row>
				{sortedFlights.length - maxFlights > 0 ? (
					<FlightsPagination maxPagination={maxPagination} setActiveFlights={setPageActiveFlights} activeFlights={pageActiveFlights} />
				) : (
					''
				)}
			</Row>
		</>
	);
};
export default Flights;
