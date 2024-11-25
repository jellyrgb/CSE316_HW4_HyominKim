// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This is the component for the user profile page.
// It displays the user's information.
// It also opens the modal for the user to change their profile image, password, and name.
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface UserData {
  email: string;
  username: string;
  profile_image: string | null;
}

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userToken = Cookies.get("userToken");

      if (!userToken) {
        navigate("/signIn");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userToken}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handlePasswordChange = async () => {
    const userToken = Cookies.get("userToken");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/${userToken}/password`,
        {
          currentPassword,
          newPassword,
        }
      );

      if (response.status === 200) {
        alert("Password updated successfully!");
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 401
      ) {
        alert("Current password is incorrect.");
      } else {
        console.error("Error updating password:", error);
        alert("Failed to update password");
      }
    }
  };

  const handleNameChange = async () => {
    const userToken = Cookies.get('userToken');
    
    try {
      const response = await axios.put(`http://localhost:5000/api/user/${userToken}/name`, {
        newName
      });

      if (response.status === 200) {
        setUserData(prev => prev ? {
          ...prev,
          username: newName
        } : null);
        alert("Username updated successfully!");
      }
    } catch (error) {
      console.error('Error updating name:', error);
      alert('Failed to update name');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "facility_reservation"); // Cloudinary upload preset

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/docfch5cp/image/upload`,
        formData
      );

      const imageUrl = cloudinaryResponse.data.secure_url;
      const userToken = Cookies.get("userToken");

      await axios.put(`http://localhost:5000/api/user/${userToken}/image`, {
        profile_image: imageUrl,
      });

      setUserData((prev) =>
        prev
          ? {
              ...prev,
              profile_image: imageUrl,
            }
          : null
      );
    } catch (error) {
      console.error("Error updating profile image:", error);
      alert("Failed to update profile image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mt-4">
      {/* User information section */}
      <main id="profile-page">
        <h1 id="profile-title">User Information</h1>

        {/* Profile image */}
        <img
          className="profile-padding"
          id="profile-pic"
          src={userData?.profile_image || "/src/images/user.png"}
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
        <p className="profile-padding">Email: {userData?.email}</p>

        {/* Password */}
        <div className="button-container profile-padding">
          <p className="profile-placeholder">Password: ******</p>
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
          <p className="profile-placeholder">Name: {userData?.username}</p>
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
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {uploading && <div className="mt-2">Uploading...</div>}
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
                <label htmlFor="currentPassword" className="form-label">
                  Current Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
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
                onClick={handlePasswordChange}
                data-bs-dismiss="modal"
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
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
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
                onClick={handleNameChange}
                data-bs-dismiss="modal"
              >
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
