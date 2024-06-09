import React, {useContext, useState} from 'react';
import { Container, Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/const';
import { login, registration } from '../http/userAPI';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
	const {user} = useContext(Context)
	const location = useLocation()
	const history = useHistory()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const click = async () => {
		try {
			let data;
			if (isLogin) {
				data = await login(email, password);
			} else {
				data = await registration(email, password);
			}
			user.setUser(user)
			user.setIsAuth(true)
			history.push(SHOP_ROUTE)
		} catch (e) {
			alert(e.response.data.message)
		}
		
		
	}

	return (
		<Container 
			className="d-flex justify-content-center align-items-center"
			style={{height: window.innerHeight - 54}}
		>
			<Card style={{width: 520, height: 335}} className="p-3 border-light shadow">
				<h2 className="m-auto" style={{fontWeight: '700', fontSize: '32px'}}>{isLogin ? 'Авторизація' : "Реєстрація"}</h2>
				<Form className="d-flex flex-column">
					<Form.Control
						style={{height: 50}}
						className="mt-3"
						placeholder="Email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Form.Control
						style={{height: 50}}
						className="mt-3"
						placeholder="Password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						type="password"
					/>
					<Button 
						style={{borderRadius: 43, height: 45, fontSize: 16}} 
						onClick={click}
						className="custom-button-admin mt-4" 
					>
						{isLogin ? 'Увійти' : 'Створити аккаунт'}
					</Button>
					<Row 
						className="d-flex justify-content-center mt-3 mb-2"
					>
						{isLogin ?
							<div>
								Немає аккаунта? <NavLink to={REGISTRATION_ROUTE}>Реєстрація</NavLink>
							</div>
							:
							<div>
								Вже є аккаунт? <NavLink to={LOGIN_ROUTE}>Увійти</NavLink>
							</div>
						}
					</Row>
				</Form>	
			</Card>
			
		</Container>
	);
});

export default Auth;