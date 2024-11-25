// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This is the component for the reservation list page.
// It displays the reservations made by the user.
import { useState, useEffect } from "react";
import axios from "axios";
import ReservedItem from "../components/ReservedItem";

function Reservations() {
  const [reservations, setReservations] = useState<any[]>([]);

  // Load reservations from the backend
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reservations");
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  // Delete a reservation
  const handleDelete = async (reservationId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${reservationId}`);
      setReservations(reservations.filter((reservation) => reservation.id !== reservationId));
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  return (
    <div className="container mt-4">
      {reservations.length === 0 ? (
        <h1>No reservations found.</h1>
      ) : (
        <div className="reservation-list">
          {reservations.map((reservation) => (
            <ReservedItem
              key={reservation.id}
              reservation={reservation}
              onDelete={() => handleDelete(reservation.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Reservations;