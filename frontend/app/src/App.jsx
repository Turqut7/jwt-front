import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [secretData, setSecretData] = useState(null);

  async function login() {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setEmail("");
      setPassword("");

      alert("Login successfully");
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function getSecretData() {
    try {
      const savedToken = localStorage.getItem("token");

      const response = await axios.get("http://localhost:4000/secret", {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      setSecretData(response.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setSecretData(null);
    alert("Logged out");
  }

  return (
    <div>
      <h1>Login Application</h1>

      {!token && (
        <div>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button onClick={login}>Login</button>
        </div>
      )}

      {token && (
        <div>
          <h2>You are logged in</h2>
          <button onClick={getSecretData}>Get Secret Data</button>
          <br />
          <br />
          <button onClick={logout}>Logout</button>

          {secretData && (
            <div>
              <h3>{secretData.message}</h3>

              <p>User ID: {secretData.user.id}</p>
              <p>Email : {secretData.user.email}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
