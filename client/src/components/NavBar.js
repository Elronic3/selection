import React, { useContext } from 'react';
import { Context } from '../index';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/const';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';
import '../custom.css';

const NavBar = observer(() => {
	const {user} = useContext(Context)
	const history = useHistory()

	const logOut = () => {
		user.setUser({})
		user.setIsAuth(false)
	}

	return (
		<Navbar bg="dark" variant="dark" style={{height: '60px'}}>
			<Container>
				<NavLink 
					style={{color:'#B3B3B3', fontWeight: '600', fontSize: '22px'}} 
					to={SHOP_ROUTE}
				>
					<svg style={{marginBottom: '4', marginRight: '4'}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M8 16C5.77778 16 3.88889 15.2222 2.33333 13.6667C0.777778 12.1111 0 10.2222 0 8C0 7.55555 0.0333334 7.11111 0.1 6.66667C0.166667 6.22222 0.288889 5.8 0.466667 5.4C0.577778 5.17778 0.716889 5.01111 0.884 4.9C1.05111 4.78889 1.23422 4.71111 1.43333 4.66667C1.63244 4.62222 1.83822 4.628 2.05067 4.684C2.26311 4.74 2.45733 4.85644 2.63333 5.03333L6.13333 8.53333L8.53333 6.13333L5.03333 2.63333C4.85556 2.45556 4.73911 2.26133 4.684 2.05067C4.62889 1.84 4.62311 1.63422 4.66667 1.43333C4.71022 1.23244 4.788 1.04889 4.9 0.882667C5.012 0.716444 5.17867 0.577778 5.4 0.466667C5.8 0.288889 6.22222 0.166667 6.66667 0.1C7.11111 0.0333334 7.55555 0 8 0C10.2222 0 12.1111 0.777778 13.6667 2.33333C15.2222 3.88889 16 5.77778 16 8C16 8.51111 15.9556 8.99467 15.8667 9.45067C15.7778 9.90667 15.6444 10.3564 15.4667 10.8L22.2 17.4667C22.8444 18.1111 23.1667 18.9 23.1667 19.8333C23.1667 20.7667 22.8444 21.5556 22.2 22.2C21.5556 22.8444 20.7667 23.1667 19.8333 23.1667C18.9 23.1667 18.1111 22.8333 17.4667 22.1667L10.8 15.4667C10.3556 15.6444 9.90578 15.7778 9.45067 15.8667C8.99556 15.9556 8.512 16 8 16Z" fill="#B3B3B3"/>
					</svg>
					Система автоматизованого додавання промислового обладнання
				</NavLink>
				{user.isAuth ?
					<Nav className="ml-auto" style={{color:'#B3B3B3'}}>
						<Button 
							variant={"outline-light"} 
							onClick={() => history.push(ADMIN_ROUTE)}
							className="custom-outline-light-hover" 
						>
							Адмін панель
						</Button>
						<Button 
							variant={"outline-light"} 
							onClick={() => logOut()}
							className='ml-2 custom-outline-light-hover' 
						>
							Вийти
						</Button>
					</Nav>
					:
					<Nav className="ml-auto" style={{color:'#B3B3B3'}}>
						<Button 
							variant={"outline-light"} 
							onClick={() => history.push(LOGIN_ROUTE)}
							className="custom-outline-light-hover"
						>
							Авторизація
						</Button>
					</Nav>
				}
			</Container>
		</Navbar>
	);
});


export default NavBar;