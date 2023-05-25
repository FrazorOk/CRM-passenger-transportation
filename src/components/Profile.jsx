import { Col, Row } from 'react-bootstrap';
import RolesDropDown from './RolesDropDown';

const Profile = () => {
	return (
		<Row className="justify-content-center bg-white shadow h-100 pb-5">
			<Col className="d-flex flex-column align-items-center gap-3">
				<h3 className="text-center mt-4">Ваша роль:</h3>
				<RolesDropDown />
			</Col>
		</Row>
	);
};
export default Profile;
