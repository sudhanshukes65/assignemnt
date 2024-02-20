import { Navbar, Nav, Container , Badge ,NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';


const Header = ({ cartItemsCount }) => {

  const {cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const totalPrice = cartItems.reduce((total, currentItem) => total + (currentItem.qty * currentItem.price), 0);

  const logoutHandler = ( ) => {
    console.log('logout');
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>BestShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FaShoppingCart /> 
                  {
                    cartItems.length > 0 && (
                      <Badge pill bg='danger' style={{marginLeft : '2px', padding: '3px', }}>
                        {
                          cartItems.reduce((a, c) => a + parseInt(c.qty), 0)
                        }
                      </Badge>
                    )
                  }
                  Cart 
                  {
                    cartItems.length > 0 && (
                      <Badge pill bg='success' style={{marginLeft : '2px', padding: '3px', }}>
                        ${
                          totalPrice

                        }
                      </Badge>
                    )
                  }
                  
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.username} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
