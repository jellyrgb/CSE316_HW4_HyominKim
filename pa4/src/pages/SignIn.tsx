// Hyomin Kim
// hyomin.kim@stonybrook.edu
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpClick = () => {
    navigate("/signUp");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/signin", {
        email,
        password,
      });

      if (response.status === 200) {
        // 로그인 성공 시 처리
        alert("Successfully signed in!");
        navigate("/"); // 홈페이지로 이동
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        alert("Wrong email or wrong password.");
      } else {
        console.error("Error signing in:", error);
        alert("Error signing in");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="sign-in-page-title">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="sign-in-submit">
          <button
            type="submit"
            className="sign-in-page-button btn btn-outline-primary"
          >
            Sign In
          </button>
          <button
            type="button"
            className="sign-in-page-button btn btn-outline-secondary"
            onClick={handleSignUpClick}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
