import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Nav, Navbar, Container, Badge, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {useLogoutMutation} from '../slices/usersApiSlice'
import {removeCredentials} from '../slices/authSlice'
import  logo from '../assets/logo.png'


const Header = () => {
  const { cartItems } = useSelector(state => state.cart)
  const { userInfo } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async() => {
    try {
      await logoutApiCall().unwrap()
      dispatch(removeCredentials())
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  } 

  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand>
                    <img src={logo} alt='Rentoza-Demo' width='50px' height='50px' />
                  Demo-Store
                </Navbar.Brand>
              </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="ms-auto">
                  <LinkContainer to='/cart'>
                    <Nav.Link><FaShoppingCart /> Cart
                    {cartItems.length > 0 && (
                      <Badge pill bg='success' style={{marginLeft:'5px'}}>
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      </Badge>
                    )}
                    </Nav.Link>
                  </LinkContainer>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <LinkContainer to='/login'>
                      <Nav.Link ><FaUser /> Sign In</Nav.Link>
                    </LinkContainer>
                  )}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header