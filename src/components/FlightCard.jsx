import { Button, Card, Col, ListGroup } from 'react-bootstrap';
import car from '../assets/img/Article_173645_860_575.jpg';
import { useState } from 'react';
import Accept from './Accept';
import { useDispatch } from 'react-redux';
import { setUserFlightsOnDataBase } from '../store/user-reducer';
import { fetchFlights } from '../store/flights-reducer';

const FlightCard = ({ flight, btn = true }) => {
	let dispatch = useDispatch();
	let { carNumber, date, driver, place, seats, timeFrom, timeTo, cost, id } = flight;
	let [fetched, setFetched] = useState(false);

	let disabledBtn = () => {
		if (seats.seats < seats.maxSeats || fetched) {
			return false;
		} else {
			return true;
		}
	};

	let ordersClickHandler = (e) => {
		dispatch(setUserFlightsOnDataBase(id, seats));

		setFetched((fetched = true));
		setTimeout(() => {
			setFetched((fetched = false));
		}, 1000);
	};

	return (
		<>
			<Col>
				{fetched ? (
					<div style={{ zIndex: '5' }} className="position-fixed top-50 start-50 translate-middle">
						<Accept text={''} />
					</div>
				) : (
					''
				)}
				<Card
					style={{
						zIndex: '1',
					}}
					text={'light'}
					border="light"
					className="shadow overflow-hidden">
					<Card.Img variant="top" src={`${car}`} />
					<ListGroup className="list-group-flush bg-dark z-index-1">
						<ListGroup.Item>
							<h6 className="p-0 m-0">
								{place.from} - {place.to}
							</h6>
						</ListGroup.Item>
						<ListGroup.Item>{date}</ListGroup.Item>
						<ListGroup.Item>
							{timeFrom} - {timeTo}
						</ListGroup.Item>
						<ListGroup.Item>Номера авто: {carNumber}</ListGroup.Item>
						<ListGroup.Item>Водій: {driver}</ListGroup.Item>
						<ListGroup.Item>
							Місця: {seats.maxSeats}/{seats.seats}
						</ListGroup.Item>
						<ListGroup.Item>
							<h6>Вартість: {cost} грн</h6>
						</ListGroup.Item>
					</ListGroup>
					{btn ? (
						<Card.Body className="bg-white">
							<Card.Text className="d-flex justify-content-center">
								<Button className="rounded-none w-75" variant="dark" onClick={ordersClickHandler} disabled={disabledBtn()}>
									Забронювати
								</Button>
							</Card.Text>
						</Card.Body>
					) : (
						''
					)}
				</Card>
			</Col>
		</>
	);
};
export default FlightCard;
