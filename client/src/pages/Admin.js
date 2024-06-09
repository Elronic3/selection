import React, {useState} from 'react';
import { Button, Container } from 'react-bootstrap';
import '../custom.css';
import CreateBrand from '../components/modals/CreateBrand';
import CreateType from '../components/modals/CreateType';
import CreateDevice from '../components/modals/CreateDevice';

const Admin = () => {
	const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
	
	return (
		<Container className='d-flex flex-column' style={{ width: '400px' }}>
			<Button className="custom-button-admin mt-4"  onClick={() => setTypeVisible(true)}>
				Додати новий тип
				<svg xmlns="http://www.w3.org/2000/svg" width="23" height="18" viewBox="0 0 23 18" fill="none">
					<path d="M21.5 9.00073H1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M13.4336 0.967285L21.5003 8.99928L13.4336 17.0326" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</Button>
			<Button className="custom-button-admin mt-4" onClick={() => setBrandVisible(true)}>
				Додати новий бренд
				<svg xmlns="http://www.w3.org/2000/svg" width="23" height="18" viewBox="0 0 23 18" fill="none">
					<path d="M21.5 9.00073H1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M13.4336 0.967285L21.5003 8.99928L13.4336 17.0326" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</Button>
			<Button className="custom-button-admin mt-4" onClick={() => setDeviceVisible(true)}>
				Додати нове обладнання
				<svg xmlns="http://www.w3.org/2000/svg" width="23" height="18" viewBox="0 0 23 18" fill="none">
					<path d="M21.5 9.00073H1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M13.4336 0.967285L21.5003 8.99928L13.4336 17.0326" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</Button>
			<CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
		</Container>
	);
};

export default Admin;
