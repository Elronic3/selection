import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useHistory } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/const';

const DeviceItem = ({device}) => {
	const history = useHistory()
	return (
		<Col md={3} style={{ marginTop: '12px' }} onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
			<Card className="device-card">
				<Image
					src={process.env.REACT_APP_API_URL + device.img}
					style={{
						width: '100%',
						height: '200px',
						objectFit: 'cover',
						borderTopLeftRadius: '10px',
						borderTopRightRadius: '10px'
					}}
				/>
				<div 
					className="d-flex justify-content-between align-items-center"
					style={{ padding: '2px', marginLeft: '10px', fontWeight: '600' }}
				>
					{device.name}
				</div>
			</Card>
		</Col>
	);
};

export default DeviceItem;