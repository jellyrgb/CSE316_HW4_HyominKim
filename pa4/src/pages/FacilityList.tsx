// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This is the component for the facility list page.
// It fetches facilities data from the server and maps it to FacilityItem components.
import FacilityItem from "../components/FacilityItem";
import { useFacilities } from "../context/FacilityContext.tsx";

function FacilityList() {
  const { facilities, loading, error } = useFacilities();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="facility-list">
      {facilities.map((facility) => (
        <FacilityItem key={facility.id} facility={facility} />
      ))}
    </div>
  );
}

export default FacilityList;
