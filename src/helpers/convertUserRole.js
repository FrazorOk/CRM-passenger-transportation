export let convertedUserRoleUA = (role) => {
	switch (role) {
		case 'passenger':
			return 'Пасажир';
		case 'driver':
			return 'Водій';
		case 'dispatcher':
			return 'Диспетчер';
		case 'Пасажир':
			return 'Пасажир';
		case 'Водій':
			return 'Водій';
		case 'Диспетчер':
			return 'Диспетчер';

		default:
			return 'Пасажир';
	}
};

export let convertedUserRoleEN = (role) => {
	switch (role) {
		case 'passenger':
			return 'passenger';
		case 'driver':
			return 'driver';
		case 'dispatcher':
			return 'dispatcher';
		case 'Пасажир':
			return 'passenger';
		case 'Водій':
			return 'driver';
		case 'Диспетчер':
			return 'dispatcher';

		default:
			return 'passenger';
	}
};
