import { Row, Col, Form } from 'react-bootstrap';
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productSlice';
import { useEffect, useState } from 'react';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = products?.products || [];

    // Apply price filter
    if (priceFilter) {
      filtered = filtered.filter(product => product.price <= parseInt(priceFilter));
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, priceFilter, searchTerm]);

  const handlePriceFilterChange = (e) => {
    setPriceFilter(e.target.value);
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
          <Form.Group controlId="priceFilter">
            <Form.Label>Filter by Price:</Form.Label>
            <Form.Control
              as="select"
              value={priceFilter}
              onChange={handlePriceFilterChange}
            >
              <option value="">All</option>
              <option value="20">Under $20</option>
              <option value="30">Under $30</option>
              <option value="50">Under $50</option>
              <option value="100">Under $100</option>
              <option value="200">Under $200</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="searchTerm">
            <Form.Label>Search Products:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </Form.Group>
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
