// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This page is for signing up.
// It has a form for signing up.
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Confirm password is not the same with password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/signup", {
        email,
        username,
        password,
        profileImage: null,
      });

      if (response.status === 201) {
        alert("User registered successfully!");
        navigate("/signIn");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 400 && error.response.data.error === 'Email already exists') {
        alert("Email already exists.");
      } else {
        console.error("Error signing up:", error);
        alert("Error signing up.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="sign-up-page-title">Sign Up</h1>
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
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Password Check
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="sign-up-submit">
          <button type="submit" className="btn btn-outline-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
