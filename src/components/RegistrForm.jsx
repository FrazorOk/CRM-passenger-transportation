import { Button, Col, Form, Row } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/user-reducer';
import { Navigate } from 'react-router-dom';
import { HOME_ROUTE } from '../utils/consts';
import { setUserOnDatabase } from '../api/datebase';
import { useForm } from 'react-hook-form';

const RegistrForm = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const authUser = useSelector((state) => state.user.user);
	const dispatch = useDispatch();

	let handleLogin = ({ email, password }) => {
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
						<Form noValidate className="justify-content-center d-flex flex-column align-items-center" onSubmit={handleSubmit(handleLogin)}>
							<Form.Group className="mb-3 w-100" controlId="formBasicEmail">
								<Form.Label>Пошта</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
									{...register('email', {
										required: true,
										pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
									})}
								/>
								{errors.email?.type === 'required' && <span className="text-danger">Обов'язкове поле</span>}
								{errors.email?.type === 'pattern' && <span className="text-danger">Невірний формат пошти</span>}
							</Form.Group>

							<Form.Group className="mb-4 w-100" controlId="formBasicPassword">
								<Form.Label>Пароль</Form.Label>
								<Form.Control
									type="password"
									placeholder="Password"
									{...register('password', {
										required: true,
									})}
								/>
								{errors.password?.type === 'required' && <span className="text-danger">Обов'язкове поле</span>}
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
