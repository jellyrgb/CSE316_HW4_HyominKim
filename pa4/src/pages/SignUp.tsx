// Hyomin Kim
// hyomin.kim@stonybrook.edu

function SignUp() {
  return (
    <div className="container mt-4">
      <h1 className="sign-up-page-title">Sign Up</h1>
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
        <div className="mb-3">
          <label htmlFor="passwordCheck" className="form-label">
            Password Check
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User Name
          </label>
          <input type="text" className="form-control" id="name" />
        </div>
        <div className="sign-up-submit">
            <button type="submit" className="btn btn-primary">
            Sign Up
            </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
