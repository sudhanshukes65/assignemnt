import { Row, Col, Form } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productSlice';
import { useEffect, useState } from 'react';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = products?.products || [];


    if (priceRange.min !== '' && priceRange.max !== '') {
      filtered = filtered.filter(product =>
        product.price >= parseInt(priceRange.min) && product.price <= parseInt(priceRange.max)
      );
    }


    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products,priceRange, searchTerm]);

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange({ ...priceRange, [name]: value });
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error?.data.message || error.error}</div>
      ) : (
        <>
          <h1>Latest Products</h1>
          <div className='d-flex justify-content-between'>
          
          <Form.Group controlId="searchTerm">
            <Form.Label>Search Products:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </Form.Group>
          <Form.Group controlId="priceRange">
            <Form.Label>Filter by Price Range:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Min"
              name="min"
              value={priceRange.min}
              onChange={handlePriceRangeChange}
            />
            <Form.Control
              type="number"
              placeholder="Max"
              name="max"
              value={priceRange.max}
              onChange={handlePriceRangeChange}
            />
          </Form.Group>
          </div>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
