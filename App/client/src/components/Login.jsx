import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,  // Change 'emailid' to 'email'
      password: password,
      type: type
    };

    console.log("Sending Data:", data); // Log the data being sent to the API

    try {
      const response = await fetch('https://thingproxy.freeboard.io/fetch/https://wy6aef7ap7.execute-api.ap-south-1.amazonaws.com/v1/users/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Check for successful response
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result); // Log the API response

      // Check the status from the API response
      if (result.statusCode === 200) {
        setMessage(`Login Successful. Welcome, !`);
        
        // Check if the result type is 'govt'
        if (result.type === 'govt') {
          navigate('/dashboard', { state: { username: result.name } });
        } else {
          // Optionally handle cases where the user is not 'govt'
          setMessage(`You do not have access to the Dashboard ${result.name}.`);
        }
      }
      else {
        setMessage('Login Failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setMessage('Error occurred. Please try again.',error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">  {/* Increased the column width */}
          <div className="card p-5 shadow-lg">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email ID</label>
                <input
                  type="email"
                  id="email"
                  className="form-control form-control-lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="type" className="form-label">Type</label>
                <input
                  type="text"
                  id="type"
                  className="form-control form-control-lg"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 btn-lg">Login</button>
            </form>
            {message && <div className="alert alert-info mt-4">
            
              {message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
