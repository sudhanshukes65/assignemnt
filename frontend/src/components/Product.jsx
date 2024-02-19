import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  // console.log(product)
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.images[0]} variant='top'  />
      </Link>

      <Card.Body>
        <Link to={`/product/${product.id}`} style ={ {  textDecoration: 'none' , color: 'black' , fontSize: '25px' }}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
          />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
