import { Button } from 'react-bootstrap';

const FlightsSort = ({ setSortOptions }) => {
	let expensiveClickHandler = (e) => {
		setSortOptions((option) => (option = 1));
	};
	let cheaperClickHandler = (e) => {
		setSortOptions((option) => (option = 2));
	};
	let soonClickHandler = (e) => {
		setSortOptions((option) => (option = 3));
	};

	return (
		<div className="d-flex gap-2">
			<Button variant="light" className="shadow-sm bg-white rounded" onClick={expensiveClickHandler}>
				Дорожчі ↑
			</Button>
			<Button variant="light" className="shadow-sm bg-white rounded" onClick={cheaperClickHandler}>
				Дешевші ↓
			</Button>
			<Button variant="light" className="shadow-sm bg-white rounded" onClick={soonClickHandler}>
				Сортувати за датою
			</Button>
		</div>
	);
};
export default FlightsSort;
