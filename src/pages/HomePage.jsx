import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ACTIV_FLIGHTS_ROUTE, CREATE_FLIGHTS_ROUTE, DEFAULT_ROUTE, FLIGHTS_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { useEffect } from 'react';
import { getUserFromDatabase } from '../api/datebase';
import { setUserData } from '../store/user-reducer';
import { Col, Container, Row } from 'react-bootstrap';
import HomeNavBar from '../components/HomeNavBar';
import Profile from '../components/Profile';
import Flights from '../components/Flights';
import ActiveFlights from '../components/ActiveFlights';
import CreateFlights from '../components/CreateFlights';
import FlightsFilter from '../components/FlightsFilter';

const HomePage = () => {
	const authUser = useSelector((state) => state.user.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if (authUser) {
			let userData = async () => {
				let userData = await getUserFromDatabase(authUser.uid);
				dispatch(setUserData(userData));
			};
			userData();
		}
	}, []);

	return (
		<>
			{authUser ? (
				<Container style={{ marginTop: '100px' }}>
					<Row className="pb-5 g-5 justify-content-center">
						<Col xs={12} md={3} className="d-flex flex-column align-items-center">
							<HomeNavBar />
							<Routes>
								<Route path={FLIGHTS_ROUTE} element={<FlightsFilter />} />
							</Routes>
						</Col>
						<Col xs={12} md={9} className="justify-content-center overflow-auto">
							<Routes>
								<Route path={HOME_ROUTE} element={<Profile />} />
								<Route path={FLIGHTS_ROUTE} element={<Flights />} />
								<Route path={ACTIV_FLIGHTS_ROUTE} element={<ActiveFlights />} />
								<Route path={CREATE_FLIGHTS_ROUTE} element={<CreateFlights />} />
								<Route path={DEFAULT_ROUTE} element={<Profile />} />
							</Routes>
						</Col>
					</Row>
				</Container>
			) : (
				<Navigate to={LOGIN_ROUTE} />
			)}
		</>
	);
};
export default HomePage;
