import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button ,Form} from 'react-bootstrap';
import Rating from '../components/Rating';

import { useGetProductDetailsQuery } from '../slices/productSlice';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);


  return (
    <>
    <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : error? (
          <div>{error?.data.message || error.error}</div>
        ) : (
          <Row>
          <Col md={5}>
            <Image src={product.images[0]} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.title}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Discount :</Col>
                    <Col style={{color: 'red'}}>
                      <strong>{product.discountPercentage}%</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Final price :</Col>
                    <Col style={{color: 'green'}}>
                      
                      <strong>${(product.price - product.price*product.discountPercentage/100).toFixed(2)}</strong>
                    </Col>
                  </Row>
              </ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
              <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Discount :</Col>
                    <Col style={{color: 'red'}}>
                      <strong>{product.discountPercentage}%</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Final price :</Col>
                    <Col style={{color: 'green'}}>
                      
                      <strong>${(product.price - product.price*product.discountPercentage/100).toFixed(2)}</strong>
                    </Col>
                  </Row>
              </ListGroup.Item>
  
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.stock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.stock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.stock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
  
                <ListGroup.Item>
                  <Button
                    className='btn-block' 
                    type='button'
                    disabled={product.stock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        )
      }
      
    </>
  );
};

export default ProductScreen;


     
