import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [e,setE] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();


  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ username, password }).unwrap(); // Changed 'email' to 'username'
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      console.error(err?.data?.message || err.error);
      setE(true);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='username'> {/* Changed 'email' to 'username' */}
          <Form.Label>Username</Form.Label> {/* Changed 'Email Address' to 'Username' */}
          <Form.Control
            type='text' // Changed 'email' to 'text'
            placeholder='Enter username' // Changed 'Enter email' to 'Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type='submit' variant='primary'>
          Sign In
        </Button>

        {isLoading && <div>Loading...</div>}
        {e  && <div>something went wrong or invalid credentials</div>}
      </Form>

      
    </div>
  );
};

export default LoginScreen;
