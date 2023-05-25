import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { removeFlight } from '../store/flights-reducer';

const FlightsTableRow = ({ flight, index, pageActiveFlights, maxFlights }) => {
	let dispatch = useDispatch();
	const [show, setShow] = useState(false);

	let { carNumber, date, driver, place, seats, timeFrom, timeTo, cost, id } = flight;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	let removeFlightClickHandle = () => {
		dispatch(removeFlight(id));
		setShow(false);
	};

	return (
		<tr>
			<td>{pageActiveFlights <= 1 ? index + 1 : (pageActiveFlights - 1) * maxFlights + index + 1}</td>
			<td>{date}</td>
			<td>{place.from}</td>
			<td>{place.to}</td>
			<td>{timeFrom}</td>
			<td>{timeTo}</td>
			<td>{cost}</td>
			<td>{seats.maxSeats + '/' + seats.seats}</td>
			<td>{driver}</td>
			<td>{carNumber}</td>
			<td>
				<button onClick={handleShow} className="text-danger" style={{ background: 'transparent' }}>
					X
				</button>
			</td>
			<Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Header closeButton>
					<Modal.Title>Скасування рейсу</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Якщо "Скасувати", тоді рейс буде скасовано, а кошти за білети повернются усім тим, хто забронював, на протязі 10 робочіх днів
					банку. Робити це виключно за крайньої необхідності, чи збоях системи.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={removeFlightClickHandle}>
						Скасувати
					</Button>
					<Button variant="dark" onClick={handleClose}>
						Відміна
					</Button>
				</Modal.Footer>
			</Modal>
		</tr>
	);
};
export default FlightsTableRow;
