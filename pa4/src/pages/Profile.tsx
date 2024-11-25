// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This is the component for the user profile page.
// It displays the user's information.
// It also opens the modal for the user to change their profile image, password, and name.
import { useState } from "react";

function Profile() {
  const [profileImage] = useState("/src/images/user.png");
  const [password] = useState("******");
  const [name] = useState("John Doe");

  return (
    <div className="container mt-4">
      {/* User information section */}
      <main id="profile-page">
        <h1 id="profile-title">User Information</h1>

        {/* Profile image */}
        <img
          className="profile-padding"
          id="profile-pic"
          src={profileImage}
          alt="User Profile"
        />
        <button
          id="change-image"
          className="profile-button profile-padding btn btn-outline-dark"
          data-bs-toggle="modal"
          data-bs-target="#image-modal"
        >
          Change Image
        </button>

        {/* Email */}
        <p className="profile-padding">Email: abc@stonybrook.edu</p>

        {/* Password */}
        <div className="button-container profile-padding">
          <p className="profile-placeholder">Password: {password}</p>
          <button
            id="change-password"
            className="profile-button btn btn-outline-dark"
            data-bs-toggle="modal"
            data-bs-target="#password-modal"
          >
            Change Password
          </button>
        </div>

        {/* Name */}
        <div className="button-container profile-padding">
          <p className="profile-placeholder">Name: {name}</p>
          <button
            id="change-name"
            className="profile-button btn btn-outline-dark"
            data-bs-toggle="modal"
            data-bs-target="#name-modal"
          >
            Change Name
          </button>
        </div>
      </main>

      {/* Change image modal */}
      <div id="image-modal" className="modal fade" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change your image</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="file"
                id="file-input"
                accept="image/*"
                style={{ display: "none" }}
              ></input>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  New Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                ></input>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                id="save-changes"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change password modal */}
      <div
        id="password-modal"
        className="modal fade"
        tabIndex={-1}
        aria-labelledby="passwordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="passwordModalLabel">
                Change your password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                data-bs-target="#password-modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New password
                </label>
                <input
                  className="form-control"
                  type="password"
                  id="newPassword"
                  placeholder="Enter the new password"
                  aria-label="password input"
                ></input>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                id="save-password"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change name modal */}
      <div
        id="name-modal"
        className="modal fade"
        tabIndex={-1}
        aria-labelledby="nameModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="nameModalLabel">
                Change your name
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                data-bs-target="#name-modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="newName" className="form-label">
                  New name
                </label>
                <input
                  className="form-control"
                  type="name"
                  id="newName"
                  placeholder="Enter the new name"
                  aria-label="name input"
                ></input>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" id="save-name">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
