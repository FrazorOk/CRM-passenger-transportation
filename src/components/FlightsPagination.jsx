import { Button } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import { scrollingTop } from '../helpers/scrollingTop';

const FlightsPagination = ({ maxPagination, setActiveFlights, activeFlights }) => {
	let items = [];

	for (let number = 1; number <= maxPagination; number++) {
		items.push(
			<Button
				key={number}
				active={number === activeFlights}
				variant="dark"
				onClick={(e) => {
					scrollingTop();
					setActiveFlights((activeFlights = number));
				}}>
				{number}
			</Button>
		);
	}

	return (
		<div className="d-flex justify-content-center">
			<Pagination className="gap-1 mt-4">{items}</Pagination>
		</div>
	);
};
export default FlightsPagination;
