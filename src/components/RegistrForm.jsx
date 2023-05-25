import { Button, Col, Form, Row } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/user-reducer';
import { Navigate } from 'react-router-dom';
import { HOME_ROUTE } from '../utils/consts';
import { setUserOnDatabase } from '../api/datebase';

const RegistrForm = () => {
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');

	const authUser = useSelector((state) => state.user.user);
	const dispatch = useDispatch();

	let hendleLogin = (e) => {
		e.preventDefault();

		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				dispatch(setUser(user));
				setUserOnDatabase(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
			});
	};

	return (
		<>
			{authUser ? (
				<Navigate to={HOME_ROUTE} />
			) : (
				<Row className="justify-content-center">
					<Col md={8} sm={8}>
						<Form className="justify-content-center d-flex flex-column align-items-center" onSubmit={hendleLogin}>
							<Form.Group className="mb-3 w-100" controlId="formBasicEmail">
								<Form.Label>Пошта</Form.Label>
								<Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
							</Form.Group>
							<Form.Group className="mb-4 w-100" controlId="formBasicPassword">
								<Form.Label>Пароль</Form.Label>
								<Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
							</Form.Group>
							<Button variant="danger w-50" type="submit">
								Зареєструвати
							</Button>
						</Form>
					</Col>
				</Row>
			)}
		</>
	);
};
export default RegistrForm;
