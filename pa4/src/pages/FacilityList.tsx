// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This is the component for the facility list page.
// It fetches facilities data from the server and maps it to FacilityItem components.
import FacilityItem from "../components/FacilityItem";
import { useFacilities } from "../context/FacilityContext.tsx";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function FacilityList() {
  const { facilities, loading, error } = useFacilities();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
    <div className="facility-list">
      {facilities.map((facility) => (
        <FacilityItem key={facility.id} facility={facility} />
      ))}
    </div>
  );
}

export default FacilityList;
