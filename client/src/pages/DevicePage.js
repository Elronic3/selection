import React, { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import { fetchOneDevice } from "../http/deviceAPI";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

	return (
		<Container className='mt-3'>
			<Row>
				<Col md={6}>
					<Row>
						<h2
							className='ml-5 mt-5'
							style={{
								fontWeight: '700',
								fontSize: '32px'
							}}
						>
							{device.name}
						</h2>
						<Image 
							src={process.env.REACT_APP_API_URL + device.img}
							style={{
								marginTop: '20px',
								width: '100%',
								height: '525px',
								objectFit: 'cover',
								borderRadius: '10px'
							}}
						/>
						<div className='d-flex justify-content-center align-items-center'
							style={{marginLeft: '25%'}}
						>
							<div
								style={{
									paddingTop: '18px',
									fontSize: '18px',
									color: '#B3B3B3'
								}}
							>
								Ціна з ПДВ:
							</div>
							<h3 
								style={{
									marginBottom: '0',
									marginLeft: '20px',
									paddingTop: '10px',
									fontSize: '30px',
									fontWeight: '500'
								}}
							>
								{device.price} грн
							</h3>
						</div>
					</Row>
				</Col>
				<Col 
					md={6}
					style={{
						paddingTop: '150px',
						paddingLeft: '150px'
					}}
				>
					<h2 
						style={{fontSize: '32px', fontWeight: '600', marginLeft: '10px', marginBottom: '25px'}}
					>Характеристики:</h2>
					{device.info.map((info, index) =>
						<Row
							key={info.id}
							style={{
								fontSize: '18px',
								marginTop: '10px',
								display: 'flex',
								justifyContent: 'space-between'
							}}
						>
							<span style={{ fontWeight: '600' }}>{info.title}:</span> 
							<span className='d-flex flex-end'>{info.description}</span>
						</Row>
					)}
				</Col>
			</Row>
		</Container>
	);
};

export default DevicePage;