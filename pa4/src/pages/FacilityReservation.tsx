// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This is the component for the facility reservation page.
// It renders the ReservationForm component.
import ReservationForm from "../components/ReservationForm.tsx";

function Reservation() {
  return (
    <div>
      <ReservationForm onSelectFacility={() => {}} />
    </div>
  );
}

export default Reservation;
