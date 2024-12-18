// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This component is renders Navigation bar.
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userToken = Cookies.get('userToken');
      setIsLoggedIn(!!userToken);

      if (userToken) {
        try {
          const response = await axios.get(`http://localhost:5001/api/user/${userToken}`);
          setProfileImage(response.data.profile_image);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSignOut = () => {
    Cookies.remove('userToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Toggle the menu, controlled by hamburger menu button
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Home button */}
      <div className="navbar-left">
        <Link to="/home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28px"
            height="28px"
            fill="currentColor"
            className="bi bi-house"
            viewBox="0 0 16 16"
          >
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
          </svg>
        </Link>
      </div>

      {/* Hamburger menu */}
      <button className="hamburger-menu" onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28px"
          height="28px"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>

      {/* Navbar links */}
      <div className={`navbar-center ${isMenuOpen ? "show" : ""}`}>
        <Link to="/facilityList" className="navbar-link">
          Facility List
        </Link>
        <Link to="/facilityReservation" className="navbar-link">
          Reservation
        </Link>

        <div className="dropdown">
          <button className="dropbutton">User ▼</button>
          <div className="dropdown-content">
            <Link to="/profile">My Information</Link>
            <Link to="/reservationList">My Reservation</Link>
          </div>
        </div>
      </div>

      <div className="navbar-right">
        {/* Profile picture in navbar */}
        {isLoggedIn && profileImage ? (
          <img
            id="navbar-profile"
            className="navbar-profile"
            width="42px"
            height="42px"
            src={profileImage}
            alt="User Profile"
          />
        ) : (
          <img
            id="navbar-profile"
            className="navbar-profile"
            width="42px"
            height="42px"
            src="/src/images/user.png"
            alt="Default Profile"
          />
        )}

        {isLoggedIn ? (
          <button
            type="button"
            id="navbar-sign-in"
            className="btn btn-outline-secondary"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <Link to="/signIn" id="navbar-sign-in" className="btn btn-outline-secondary">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
