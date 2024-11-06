import { useState } from "react";
import "./Login.css";
import art from "./assets/art.avif";
import BMW from "./assets/BMW.svg";
import logo from "./assets/googlelogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToken } from "./main";
import { API } from "./main";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refreshToken, setRefreshToken] = useState(null);
  const { token, setToken } = useToken();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        API + "/api/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setToken(response.data.token);
      await navigate("/dashboard");
    } catch (error) {
      console.error(
        "Login failed",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div id="login-page">
      <div id="login-parent-container">
        <div id="login-box">
          <div id="left-side">
            <div className="container">
              <div className="image-logo">
                <img src={BMW} />
                <p>P & W BMWs</p>
              </div>
              <div className="welcome">CRM AI WATCHDOG</div>
              <div className="logo">Login</div>

              <form onSubmit={handleLogin}>
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
                  <div className="password">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button type="submit" className="sign-in-btn">
                  Login
                </button>

                <div className="create-account">
                  Don't Have an Account? <a href="/register">Register</a>
                </div>
              </form>
            </div>
          </div>
          <div id="right-side">
            <img src={art} alt="art" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
