import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { convertedUserRoleEN, convertedUserRoleUA } from '../helpers/convertUserRole';
import { fetchUserRole } from '../store/user-reducer';

const RolesDropDown = () => {
	let userRole = useSelector((state) => state.user.userData.role);
	let [role, setRole] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		setRole(convertedUserRoleUA(userRole));
	}, [userRole]);

	let changeRole = (e) => {
		let value = convertedUserRoleEN(e.target.innerHTML);
		dispatch(fetchUserRole(value));
	};

	return (
		<Dropdown>
			<Dropdown.Toggle variant="danger" id="dropdown-basic">
				{role}
			</Dropdown.Toggle>
			<Dropdown.Menu>
				<Dropdown.Item onClick={changeRole}>Пасажир</Dropdown.Item>
				<Dropdown.Item onClick={changeRole}>Водій</Dropdown.Item>
				<Dropdown.Item onClick={changeRole}>Диспетчер</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};
export default RolesDropDown;
