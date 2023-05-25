import arrow from '../assets/img/icons/liAfterWhite.svg';

const Accept = ({ text }) => {
	let style = {
		width: '200px',
	};

	return (
		<div className="bg-dark text-light p-3 d-flex flex-column align-items-center justify-contant-center gap-2 p-5" style={style}>
			<h3>{text}</h3>
			<img src={arrow} alt="sorry" className="w-50" />
		</div>
	);
};
export default Accept;
