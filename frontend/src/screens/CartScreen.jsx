import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
} from 'react-bootstrap';


const CartScreen = () => {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
                      <h2> Your cart is empty</h2> 
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.images[0]} alt={item.title} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.id}`}>{item.title}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
};

export default CartScreen;