import { Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ACTIV_FLIGHTS_ROUTE, CREATE_FLIGHTS_ROUTE, FLIGHTS_ROUTE, HOME_ROUTE } from '../utils/consts';
import { useSelector } from 'react-redux';

const HomeNavBar = () => {
	let role = useSelector((state) => state.user.userData.role);

	return (
		<Nav defaultActiveKey="/home" className="flex-column gap-2 w-100 ">
			<NavLink to={HOME_ROUTE}>
				<Button variant="dark" className="w-100">
					Профіль
				</Button>
			</NavLink>
			<NavLink to={FLIGHTS_ROUTE}>
				<Button variant="dark" className="w-100">
					Поїздки
				</Button>
			</NavLink>

			{role === 'Диспетчер' || role === 'dispatcher' ? (
				<NavLink to={CREATE_FLIGHTS_ROUTE}>
					<Button variant="dark" className="w-100">
						Створити поїздку
					</Button>
				</NavLink>
			) : (
				''
			)}
			{role === 'Пасажир' || role === 'passenger' ? (
				<NavLink to={ACTIV_FLIGHTS_ROUTE}>
					<Button variant="dark" className="w-100">
						Заплановані поїздки
					</Button>
				</NavLink>
			) : (
				''
			)}
		</Nav>
	);
};
export default HomeNavBar;
