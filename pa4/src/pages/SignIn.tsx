// Hyomin Kim
// hyomin.kim@stonybrook.edu

import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const handleSignUpClick = () => {
        navigate("/signUp");
    }

  return (
    <div className="container mt-4">
      <h1 className="sign-in-page-title">Sign In</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        
        <div className="sign-in-submit">
            <button type="submit" className="sign-in-page-button btn btn-outline-primary">
            Sign In
            </button>
            <button type="button" className="sign-in-page-button btn btn-outline-secondary" onClick={handleSignUpClick}>
            Sign Up
            </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
