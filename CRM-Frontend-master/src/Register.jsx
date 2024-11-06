import { useState } from 'react';
import './Register.css';
import art from './assets/art2.jpg';
import BMW from './assets/BMW.svg';
import logo from './assets/googlelogo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToken } from './main';
import { API } from './main';


function Register() {
  const [user_name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();
  const { token, setToken } = useToken();

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      name: user_name,
      password,
      email,
    };
    console.log(data);
    try {
      const response = await axios.post(API + '/api/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setToken(response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed', error.response ? error.response.data : error.message);

    }
  };

  return (
    <div id='register-page'>
      <div id='register-box'>
        <div id='left-side'>
          <div className="container">
            <div className="image-logo-signup">
              <img src={BMW} />
              <p>P & W BMWs</p>
            </div>
            <div className="welcome-signup">CRM AI WATCHDOG</div>
            <div className="logo-signup">Register</div>

            <form onSubmit={handleRegister}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  value={user_name}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  id="password2"
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>

              <button type="submit" className="register-btn">Register</button>
              <div className="create-account">
                Already have an account? <a href="/login">Log in</a>
              </div>
            </form>
          </div>
        </div>
        <div id='right-side'>
          <img src={art} alt='art' />
        </div>
      </div>
    </div>
  );
}

export default Register;
