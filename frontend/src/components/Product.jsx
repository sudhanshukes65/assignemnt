import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  // console.log(product)
  return (
    <Card className='my-3 p-3 rounded' >
      <div className="image-container" style={{height:'200px', overflow: 'hidden' }} >
      <Link to={`/product/${product.id}`}>
        <Card.Img src={product.images[0]} variant='top' style={{height:'200px' }}   />
      </Link>

      </div>

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
        <div className='d-flex justify-content-between'>
        <Card.Text as='h3'>${product.price}</Card.Text>
        <Card.Text as='h3' style={{color:'red', fontSize:'18px',paddingTop:'11px'}}>{product.discountPercentage}%off</Card.Text>
        </div>
        
      </Card.Body>
    </Card>
  );
};

export default Product;
