import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState } from 'react';

const App = () => {

  const [cartItems, setCartItems] = useState([]);
  return (
    <>
      <Header cartItemsCount={cartItems.length}/>
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
