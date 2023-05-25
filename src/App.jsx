import { Route, Routes, redirect, useNavigate } from 'react-router-dom';
import './style/App.scss';
import { DEFAULT_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from './utils/consts';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import BasicExample from './components/BasicExample';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterBlock from './components/FooterBlock';

function App() {
	return (
		<div className="wrapper">
			<BasicExample />
			<div className="page">
				<Routes>
					<Route path={HOME_ROUTE} element={<HomePage />} />
					<Route path={LOGIN_ROUTE} element={<LoginPage />} />
					<Route path={REGISTRATION_ROUTE} element={<RegisterPage />} />
					<Route path={DEFAULT_ROUTE} element={<HomePage />} />
				</Routes>
			</div>
			<FooterBlock />
		</div>
	);
}

export default App;
