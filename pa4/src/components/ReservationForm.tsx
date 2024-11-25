// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This component is a child component of FacilityReservation.tsx.
// It renders the form for making a reservation.
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Facility, Reservation } from "../data/Types.ts";
import ReservationItem from "../components/ReservationItem";
import { useFacilities } from "../context/FacilityContext.tsx";
import { useReservations } from "../context/ReservationContext.tsx";

interface ReservationFormProps {
  onSelectFacility: (facility: Facility | null) => void;
}

function ReservationForm({ onSelectFacility }: ReservationFormProps) {
  const { facilities } = useFacilities();
  const { addReservation } = useReservations();
  const [facility, setFacility] = useState<Facility | null>(null);

  // Set default values for the form fields
  const today = new Date();
  const [date, setDate] = useState(today.toISOString().split("T")[0]);
  const [people, setPeople] = useState(1);
  const [affiliation, setAffiliation] = useState("yes");
  const [purpose, setPurpose] = useState("");
  // const [userName, setUserName] = useState("");

  // Set default facility to "Gym"
  useEffect(() => {
    if (facilities.length > 0) {
      const defaultFacility = facilities.find((f) => f.name === "Gym") || null;
      setFacility(defaultFacility);
      onSelectFacility(defaultFacility);
    }
  }, [facilities, onSelectFacility]);

  // Function to get the date only
  const getDateOnly = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  // Handle the form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!facility) return;

    const maxCapacity = facility.max_capacity;
    const minCapacity = facility.min_capacity;
    const selectedDate = new Date(date);

    // If the number of people is not within the capacity range, show an alert
    if (people > maxCapacity || people < minCapacity) {
      alert("Cannot reserve. (Capacity)");
      return;
    }

    // Remove time information from the dates (for same-day reservation)
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const selectedDateOnly = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

    // If the selected date is before today, show an alert
    if (selectedDateOnly < todayDateOnly) {
      alert("Cannot reserve. (Date)");
      return;
    }

    // If the facility is only available for SUNY Korea students, show an alert
    if (facility.only_for_suny == true && affiliation === "no") {
      alert("Cannot reserve. (Affiliation)");
      return;
    }

    // Use the formula to get the day of the week
    const day = selectedDate.getDate();
    let month = selectedDate.getMonth() + 1;
    let year = selectedDate.getFullYear();

    if (month === 1 || month === 2) {
      year -= 1;
      month += 12;
    }

    const yearOfCentury = year % 100;
    const century = Math.floor(year / 100);

    const dayOfWeek =
      (day +
        Math.floor((13 * (month + 1)) / 5) +
        yearOfCentury +
        Math.floor(yearOfCentury / 4) +
        Math.floor(century / 4) +
        5 * century) % 7;
    const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

    // If the facility is not available on the selected day, show an alert
    if (!facility.available_days.includes(days[Math.floor(dayOfWeek)])) {
      alert("Cannot reserve. (Day of the week)");
      return;
    }

    // Create a reservation object
    const reservation: Reservation = {
      id: 0, // Temporary id, will be replaced by the server
      reservation_date: date,
      user_number: people,
      is_suny_korea: affiliation === "yes",
      purpose,
      facility_id: facility.id,
      user_name: "John Doe",
    };

    // Check for existing reservation on the same day
    const existingReservation = await axios.get("http://localhost:5000/api/reservations");
    const existingReservationData = existingReservation.data;
    const existingReservationOnSameDay = existingReservationData.find(
      (r: any) => getDateOnly(r.reservation_date) === getDateOnly(date)
    );

    if (existingReservationOnSameDay) {
      alert("Cannot reserve. (Existing reservation on the same day)");
      return;
    }

    // Check for existing reservation for the same facility
    const existingReservationForSameFacility = existingReservationData.find(
      (r: any) => r.facility_id === facility.id
    );

    if (existingReservationForSameFacility) {
      alert("Cannot reserve. (Existing reservation for the same facility)");
      return;
    }

    // Save the reservation
    try {
      await addReservation(reservation);
      alert("Reserved successfully.");
    } catch (error) {
      console.error("Error saving reservation:", error);
      alert("Error saving reservation.");
    }

  };

  // Handle the facility change
  const handleFacilityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFacility = facilities.find((f) => f.name === event.target.value) || null;
    setFacility(selectedFacility);
    onSelectFacility(selectedFacility);
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <select
            id="facility"
            className="form-control"
            value={facility?.name || ""}
            onChange={handleFacilityChange}
          >
            {facilities.map((f) => (
              <option key={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        {/* Render facility information */}
        {facility && <ReservationItem facility={facility} />}

        {/* Date to be used */}
        <div className="form-group">
          <label htmlFor="facility" className="form-label">Date to be Used:</label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Number of people */}
        <div className="form-group">
          <label htmlFor="people" className="form-label">Number of People:</label>
          <input
            type="number"
            id="people"
            className="form-control"
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
            min="1"
          />
        </div>

        {/* Affiliation */}
        <div className="form-group">
          <div className="form-check">
            <input
              type="radio"
              id="affiliationYes"
              className="form-check-input"
              value="yes"
              checked={affiliation === "yes"}
              onChange={() => setAffiliation("yes")}
            />
            <label htmlFor="affiliationYes" className="form-check-label">SUNY Korea</label>
          </div>

          <div className="form-check">
            <input
              type="radio"
              id="affiliationNo"
              className="form-check-input"
              value="no"
              checked={affiliation === "no"}
              onChange={() => setAffiliation("no")}
            />
            <label htmlFor="affiliationNo" className="form-check-label">Non-SUNY Korea</label>
          </div>
        </div>

        {/* Purpose of use */}
        <div className="form-group">
          <label htmlFor="purpose" className="form-label">
            Purpose of Use:
          </label>
          <textarea
            id="purpose"
            className="form-control"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary submit-button">
            Reserve
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
