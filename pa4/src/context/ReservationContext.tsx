// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This file is a context provider for reservations.
// It fetches the reservations from the server and provides them to the components that need them.
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Reservation } from '../data/Types.ts';

interface ReservationContextProps {
  reservations: Reservation[];
  addReservation: (reservation: Reservation) => Promise<void>;
  deleteReservation: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ReservationContext = createContext<ReservationContextProps>({
  reservations: [],
  addReservation: async () => {},
  deleteReservation: async () => {},
  loading: true,
  error: null,
});

export const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reservations');
        setReservations(response.data);
      } catch (err) {
        setError('Failed to load reservations');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const addReservation = async (reservation: Reservation) => {
    try {
      const response = await axios.post('http://localhost:5000/api/reservations', reservation);
      if (response.status === 201) {
        setReservations([...reservations, response.data]);
      } else {
        throw new Error('Failed to add reservation');
      }
    } catch (err) {
      setError('Failed to add reservation');
    }
  };

  const deleteReservation = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${id}`);
      setReservations(reservations.filter((reservation) => reservation.id !== id));
    } catch (err) {
      setError('Failed to delete reservation');
    }
  };

  return (
    <ReservationContext.Provider value={{ reservations, addReservation, deleteReservation, loading, error }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservations = () => React.useContext(ReservationContext);