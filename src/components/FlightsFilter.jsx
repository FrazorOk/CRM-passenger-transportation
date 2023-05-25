import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveFlights } from '../store/flights-reducer';
import { filterFlights } from '../helpers/filterFlights';

const FlightsFilter = () => {
	const dispatch = useDispatch();
	let flights = useSelector((state) => state.flights.flights);

	let initFilters = {
		from: '',
		to: '',
		date: '',
		time: '',
		seats: false,
	};

	let [filters, setFilters] = useState(initFilters);

	useEffect(() => {
		let filtredActiveFlights = () => filterFlights(flights, filters);

		dispatch(setActiveFlights(filtredActiveFlights()));
	}, [filters]);

	return (
		<>
			<Row className="shadow p-3 mb-5 bg-white rounded w-100 mt-5 d-flex flex-column align-items-center pt-4 pb-4 ">
				<Col xs={9} md={10}>
					<Form className="position-relative">
						<Row className="position-absolute top-0 end-0">
							<Col className="d-flex justify-content-end">
								<Button
									variant="danger"
									className="pt-0 pb-0 pl-2 pr-2"
									onClick={() => {
										setFilters((filters = initFilters));
									}}>
									Очистити
								</Button>
							</Col>
						</Row>

						<Form.Label className="mt-2">Відправка з:</Form.Label>
						<Form.Control
							type="email"
							placeholder="Звідки"
							value={filters.from}
							onChange={(e) => {
								setFilters({ ...filters, from: e.currentTarget.value });
							}}
						/>

						<Form.Label className="mt-3">Прибуття до:</Form.Label>
						<Form.Control
							type="email"
							placeholder="Куди"
							value={filters.to}
							onChange={(e) => {
								setFilters({ ...filters, to: e.currentTarget.value });
							}}
						/>

						<Row className="mt-3">
							<Col md={6}>
								<Form.Label>Дата:</Form.Label>
								<Form.Control
									type="date"
									placeholder="Дата"
									value={filters.date}
									onChange={(e) => {
										setFilters({ ...filters, date: e.currentTarget.value });
									}}
								/>
							</Col>
							<Col md={6}>
								<Form.Label>Час:</Form.Label>
								<Form.Control
									type="time"
									placeholder="час"
									value={filters.time}
									onChange={(e) => {
										setFilters({ ...filters, time: e.currentTarget.value });
									}}
								/>
							</Col>
						</Row>

						<Form.Check
							className="mt-3"
							type="switch"
							id="custom-switch"
							label="Є вільні місця"
							checked={filters.seats}
							onChange={(e) => {
								setFilters({ ...filters, seats: e.currentTarget.checked });
							}}
						/>
					</Form>
				</Col>
			</Row>
		</>
	);
};
export default FlightsFilter;
