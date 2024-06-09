import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Card, Row } from 'react-bootstrap';
import '../custom.css';

const BrandBar = observer(() => {
	const {device} = useContext(Context)
	return (
		<Row className="d-flex ml-0">
			{device.brands.map(brand =>
				<Card
					style={{
						backgroundColor: brand.id === device.selectedBrand.id ? '#00B207' : 'initial',
						color: brand.id === device.selectedBrand.id ? 'white' : 'initial',
						cursor: 'pointer'
				  	}}
					key={brand.id}
					className="p-1 ml-2"
					onClick={() => device.setSelectedBrand(brand)}
				>
					{brand.name}
				</Card>
			)}
		</Row>
	);
});

export default BrandBar;