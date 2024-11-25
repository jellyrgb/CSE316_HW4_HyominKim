// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This is the component for the facility reservation page.
// It renders the ReservationForm component.
import ReservationForm from "../components/ReservationForm.tsx";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Reservation() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserData = async () => {
      const userToken = Cookies.get("userToken");

      if (!userToken) {
        navigate("/signIn");
        return;
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      <ReservationForm onSelectFacility={() => {}} />
    </div>
  );
}

export default Reservation;
