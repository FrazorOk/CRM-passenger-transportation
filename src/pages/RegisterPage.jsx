import { Col, Container, Row } from 'react-bootstrap';
import RegistrForm from '../components/RegistrForm';
import { LOGIN_ROUTE } from '../utils/consts';
import { Link } from 'react-router-dom';
import bground from '../assets/img/Auto_Big_bus_Setra_095409_.jpg';

const RegisterPage = () => {
	return (
		<div
			className="bg-image p-5"
			style={{
				backgroundImage: `url('${bground}')`,
				minHeight: 'calc(100vh - 50px)',
				height: '100%',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				overflow: 'auto',
			}}>
			<Container>
				<Row className="justify-content-center mt-5 ">
					<Col md={5} className="bg-light mt-5 pb-5">
						<Row>
							<h2 className="bg-dark p-3 text-center text-light">РЕЄСТРАЦІЯ</h2>
						</Row>
						<Row className="p-4" style={{ height: '230px' }}>
							<Col>
								<RegistrForm />
							</Col>
						</Row>
						<Row>
							<Col className="mt-5">
								<Link to={LOGIN_ROUTE} className="text-dark">
									<h5 className="text-dark text-center">Увійти</h5>
								</Link>
							</Col>
						</Row>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
export default RegisterPage;
