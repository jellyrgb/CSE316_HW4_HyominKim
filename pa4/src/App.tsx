// Hyomin Kim
// hyomin.kim@stonybrook.edu

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FacilityProvider } from "./context/FacilityContext.tsx";
import { ReservationProvider } from "./context/ReservationContext.tsx";

import "./App.css";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import FacilityList from "./pages/FacilityList.tsx";
import FacilityReservation from "./pages/FacilityReservation.tsx";
import ReservationList from "./pages/ReservationList.tsx";
import Profile from "./pages/Profile.tsx";

function App() {
  return (
    <FacilityProvider>
      <ReservationProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/facilityList" element={<FacilityList />} />
              <Route path="/facilityReservation" element={<FacilityReservation />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/reservationList" element={<ReservationList />} />
            </Routes>
          </div>
        </Router>
      </ReservationProvider>
    </FacilityProvider>
  );
}

export default App;
