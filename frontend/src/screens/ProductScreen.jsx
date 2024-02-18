import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';
import { useGetProductDetailsQuery } from '../slices/productSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();
  
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);


  

  // const addToCartHandler = () => {
  //   const itemExists = cartItems.find(item => item.id === product.id);
  //   // console.log(itemExists.id)

  //   if (itemExists) {
  //     // Increment quantity if item already exists in the cart
  //     setCartItems(
  //       cartItems.map(item =>
  //         item.id === product.id ? { ...item, qty: item.qty + 1 } : item
  //       )
  //     );
  //   } else {
  //     // Add new item to the cart
  //     setCartItems([...cartItems, { ...product, qty: 1 }]);
  //   }

  //   console.log(cartItems)
  // };

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
                    <Col>
                      <strong>{product.discountPercentage}%</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Final price :</Col>
                    <Col>
                      
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
                    <Col>
                      <strong>{product.discountPercentage}%</strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col>Final price :</Col>
                    <Col>
                      
                      <strong>${(product.price - product.price*product.discountPercentage/100).toFixed(2)}</strong>
                    </Col>
                  </Row>
              </ListGroup.Item>
  
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
  
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                    // onClick={addToCartHandler}
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


     
