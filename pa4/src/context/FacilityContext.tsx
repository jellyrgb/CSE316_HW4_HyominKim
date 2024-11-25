// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This file is a context provider for facilities.
// It fetches the facilities from the server and provides them to the components that need them.
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { Facility } from '../data/Types';

interface FacilityContextType {
  facilities: Facility[];
  loading: boolean;
  error: string | null;
}

const FacilityContext = createContext<FacilityContextType>({
  facilities: [],
  loading: true,
  error: null,
});

export const FacilityProvider = ({ children }: { children: ReactNode }) => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/facilities');
        setFacilities(response.data);
      } catch (err) {
        setError('Failed to load facilities');
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  return (
    <FacilityContext.Provider value={{ facilities, loading, error }}>
      {children}
    </FacilityContext.Provider>
  );
};

export const useFacilities = () => React.useContext(FacilityContext);
