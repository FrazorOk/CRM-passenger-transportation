import Tab from 'react-bootstrap/Tab';
import From from '../components/From';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { REGISTRATION_ROUTE } from '../utils/consts';
import bground from '../assets/img/login_bg.jpg';
import EmailLogin from '../components/EmailLogin';
import { authFromProvider } from '../store/user-reducer';
import { useDispatch } from 'react-redux';
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';

const LoginPage = () => {
	const dispatch = useDispatch();

	let googleClickHandler = (e) => {
		const provider = new GoogleAuthProvider();

		const credential = (result) => {
			return GoogleAuthProvider.credentialFromResult(result);
		};

		dispatch(authFromProvider(provider, credential));
	};

	let facebookClickHandler = (e) => {
		const provider = new FacebookAuthProvider();

		const credential = (result) => {
			return FacebookAuthProvider.credentialFromResult(result);
		};

		dispatch(authFromProvider(provider, credential));
	};

	return (
		<div
			className="p-5"
			style={{
				minHeight: 'calc(100vh - 50px)',
				height: '100%',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundImage: `url('${bground}')`,
				overflow: 'auto',
			}}>
			<Container>
				<Tab.Container id="fill-tab-example" defaultActiveKey="key1">
					<Row className="justify-content-center mt-5">
						<Col md={5} className="bg-light mt-5 pb-5 shadow">
							<Row>
								<h2 className="bg-dark p-3 text-center text-light">ВХІД</h2>
							</Row>
							<Row className="p-4" style={{ minHeight: '250px' }}>
								<Col>
									<Tab.Content>
										<Tab.Pane eventKey="key1">
											<EmailLogin />
										</Tab.Pane>
										<Tab.Pane eventKey="key3">
											<From />
										</Tab.Pane>
										<Tab.Pane eventKey="key4">
											<From />
										</Tab.Pane>
									</Tab.Content>
								</Col>
							</Row>
							<Row>
								<Col>
									<Nav className="justify-content-center gap-2 mt-1">
										<Nav.Item className="bg-secondary rounded-3 ">
											<Nav.Link className="text-white" eventKey="key1">
												<img
													src="https://cdn0.iconfinder.com/data/icons/apple-apps/100/Apple_Mail-512.png"
													alt="mail"
													width="22"
													height="22"
													className="d-inline-block align-top"
												/>{' '}
												Пошта
											</Nav.Link>
										</Nav.Item>
										<Nav.Item className="bg-secondary rounded-3">
											<Nav.Link className="text-light" onClick={googleClickHandler}>
												<img
													src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png?20230305195327"
													alt="google"
													width="20"
													height="20"
													className="d-inline-block align-top"
												/>{' '}
												Google
											</Nav.Link>
										</Nav.Item>
										<Nav.Item className="bg-secondary rounded-3">
											<Nav.Link className="text-white" onClick={facebookClickHandler}>
												<img
													src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/2048px-Facebook_f_logo_%282021%29.svg.png"
													alt="facebook"
													width="20"
													height="20"
													className="d-inline-block align-top"
												/>{' '}
												Facebook
											</Nav.Link>
										</Nav.Item>
									</Nav>
								</Col>
							</Row>
							<Row>
								<Col className="mt-5">
									<Link to={REGISTRATION_ROUTE} className="text-dark">
										<h5 className="text-dark text-center">Зареєструватися</h5>
									</Link>
								</Col>
							</Row>
						</Col>
					</Row>
				</Tab.Container>
			</Container>
		</div>
	);
};
export default LoginPage;
