import { Col, Container, Row } from 'react-bootstrap';

const FooterBlock = () => {
	return (
		<div className="bg-dark d-flex align-items-center" style={{ height: '50px' }}>
			<Container>
				<Row>
					<Col>
						<p className="text-white m-0">Copyright © 2023 FastTransport. All Rights reserved.</p>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
export default FooterBlock;
