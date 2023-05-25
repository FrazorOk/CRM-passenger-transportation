import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { Link } from 'react-router-dom';
import logo from '../assets/img/icons/logo.png';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../store/user-reducer';

function BasicExample() {
	const authUser = useSelector((state) => state.user.user);
	const dispatch = useDispatch();

	let removedUser = () => {
		const auth = getAuth();
		dispatch(resetUser());

		signOut(auth)
			.then(() => {})
			.catch((error) => {
				console.log('error signOut');
			});
	};

	return (
		<Navbar bg="dark" variant="dark" fixed="top">
			<Container>
				<Link to={LOGIN_ROUTE} className="d-flex align-items-center gap-1" style={{ textDecoration: 'none' }}>
					<img alt="" src={logo} width="30" height="30" className="d-inline-block" style={{ filter: 'invert(100%)' }} />{' '}
					<h3 className="pb-0 mb-0 text-white">ШвидкоТранспорт</h3>
				</Link>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end ">
					<Navbar.Text>
						{authUser ? (
							<Link to={LOGIN_ROUTE}>
								<Button variant="outline-light" onClick={removedUser}>
									Вийти
								</Button>
							</Link>
						) : (
							<ButtonToolbar>
								<Link to={LOGIN_ROUTE}>
									<Button className="me-2" variant="dark">
										Увійти
									</Button>
								</Link>
								<Link to={REGISTRATION_ROUTE}>
									<Button variant="outline-light">Зареєструватися</Button>
								</Link>
							</ButtonToolbar>
						)}
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default BasicExample;
