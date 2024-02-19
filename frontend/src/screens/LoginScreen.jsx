import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 

const LoginScreen = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.message || "Failed to login");
          }
    
          // If response is successful, handle authentication logic here
          console.log("Login successful");
          console.log(data); // You can handle the response data here
          navigate('/');
        } catch (error) {
          setError(error.message);
        }
      };
  return (
    <div>
      <h2>Login</h2>
       {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
         <div>
           <label>Username:</label>
           <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginScreen


