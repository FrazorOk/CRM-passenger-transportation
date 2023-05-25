import { Table } from 'react-bootstrap';
import FlightsTableRow from './FlightsTableRow';

const FilghtsTable = ({ flights, pageActiveFlights, maxFlights }) => {
	return (
		<Table striped bordered hover variant="white" className="bg-white shadow">
			<thead>
				<tr>
					<th>#</th>
					<th>Дата</th>
					<th>Звідки</th>
					<th>Куди</th>
					<th>Відправки</th>
					<th>Прибуття</th>
					<th>Вартість</th>
					<th>Місця</th>
					<th>Водій</th>
					<th>Номери</th>
					<th>X</th>
				</tr>
			</thead>
			<tbody>
				{flights.map((flight, index) => {
					return (
						<FlightsTableRow flight={flight} index={index} key={index} pageActiveFlights={pageActiveFlights} maxFlights={maxFlights} />
					);
				})}
			</tbody>
		</Table>
	);
};
export default FilghtsTable;
