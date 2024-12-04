// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This page is for signing in.
// It has a form for signing in and a button to navigate to the sign up page.
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

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
      const response = await axios.post("http://localhost:5001/api/signin", {
        email,
        password,
      });

      if (response.status === 200) {
        Cookies.set('userToken', response.data.id, { expires: 1 });
        alert("Successfully signed in!");
        navigate("/");
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
