import { Button, Col, Form, Row } from 'react-bootstrap';
import { randomId } from '../helpers/randomId';
import { useState } from 'react';
import { setFlightOnDatabase } from '../store/flights-reducer';
import { useDispatch, useSelector } from 'react-redux';
import Accept from './Accept';

const CreateFlights = () => {
	let dispatch = useDispatch();
	let fetched = useSelector((state) => state.flights.fetchedNewFlight);

	let initState = {
		date: '',
		timeFrom: '',
		timeTo: '',
		maxSeats: '',
		from: '',
		to: '',
		carNumber: '',
		driver: '',
		cost: '',
	};

	let [formValue, setFormValue] = useState(initState);

	let submitForm = (e) => {
		e.preventDefault();
		let id = randomId();

		dispatch(setFlightOnDatabase({ ...formValue, id }));

		setTimeout(() => {
			setFormValue((formValue = initState));
		});
	};

	return (
		<Row className="shadow bg-white p-5">
			<Col>
				<Form className="position-relative" onSubmit={submitForm}>
					{fetched ? (
						<div className="position-absolute top-50 start-50 translate-middle">
							<Accept text="СТВОРЕНО" />
						</div>
					) : (
						''
					)}
					<Row>
						<h3 className="text-center">Створення рейсу</h3>
					</Row>

					<Row className="gap-3 justify-content-center mt-5">
						<Col md={4}>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Дата:</Form.Label>
								<Form.Control
									type="date"
									placeholder="дата"
									value={formValue.date}
									onChange={(e) => setFormValue({ ...formValue, date: e.target.value })}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Час відправки:</Form.Label>
								<Form.Control
									type="time"
									placeholder="час"
									value={formValue.timeFrom}
									onChange={(e) => setFormValue({ ...formValue, timeFrom: e.target.value })}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Час прибуття:</Form.Label>
								<Form.Control
									type="time"
									placeholder="час"
									value={formValue.timeTo}
									onChange={(e) => setFormValue({ ...formValue, timeTo: e.target.value })}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Кількість місць:</Form.Label>
								<Form.Control
									type="number"
									placeholder="місця"
									value={formValue.maxSeats}
									onChange={(e) => setFormValue({ ...formValue, maxSeats: e.target.value })}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Вартість:</Form.Label>
								<Form.Control
									type="number"
									placeholder="вартість"
									value={formValue.cost}
									onChange={(e) => setFormValue({ ...formValue, cost: e.target.value })}
								/>
							</Form.Group>
						</Col>

						<Col md={4}>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Відправка з:</Form.Label>
								<Form.Control
									type="text"
									placeholder="Place from"
									value={formValue.from}
									onChange={(e) => setFormValue({ ...formValue, from: e.target.value })}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Прибуття до:</Form.Label>
								<Form.Control
									type="text"
									placeholder="Place to"
									value={formValue.to}
									onChange={(e) => setFormValue({ ...formValue, to: e.target.value })}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Номер авто:</Form.Label>
								<Form.Control
									type="text"
									placeholder="Car number"
									value={formValue.carNumber}
									onChange={(e) => setFormValue({ ...formValue, carNumber: e.target.value })}
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Водій:</Form.Label>
								<Form.Control
									type="text"
									placeholder="Driver"
									value={formValue.driver}
									onChange={(e) => setFormValue({ ...formValue, driver: e.target.value })}
								/>
							</Form.Group>
						</Col>
					</Row>

					<Row className="justify-content-center mt-5">
						<Button
							className="pe-5 ps-5 pt-2 pb-2"
							variant="danger"
							type="submit"
							style={{
								width: 'fit-content',
							}}>
							Створити
						</Button>
					</Row>
				</Form>
			</Col>
		</Row>
	);
};
export default CreateFlights;
