import { Col, Row } from 'react-bootstrap';
import RolesDropDown from './RolesDropDown';
import img from '../assets/img/bus_profile.jpg';

const Profile = () => {
	return (
		<Row className=" w-100 justify-content-center bg-white shadow pb-5 pt-3">
			<Col className="d-flex flex-column align-items-center gap-4" style={{ height: 'fit-content' }}>
				<div className="w-100 overflow-hidden position-relative" style={{ paddingBottom: '35%' }}>
					<img src={img} className="w-100 position-absolute start-50 translate-middle" style={{ objectFit: 'fill', top: '40%' }} />
				</div>
				<h4 className="text-center ps-5 pe-5 ">
					Раді вітати на проекті ШвидкоТранспорт, для початку роботи виберіть, будь ласка, вашу роль
				</h4>
				<div className="d-flex flex-column align-items-center gap-2">
					<h5 className="text-center ">Ваша роль:</h5>
					<RolesDropDown />
				</div>
			</Col>
		</Row>
	);
};
export default Profile;
