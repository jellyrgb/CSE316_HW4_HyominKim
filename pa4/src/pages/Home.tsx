// Hyomin Kim
// hyomin.kim@stonybrook.edu

// This is the component for the home page.
// It provides a brief description of the application features.
function Home() {
  return (
    <div className="home-page">
      <ul>
        <li>
          <h3>Facility Reservation</h3>
        </li>
        <ul>
          <li>Facility List</li>
          <ol>
            <li className="numbered">
              Reservation Date should be the date after today
            </li>
            <li className="numbered">
              The number of users should be between the maximum number of people
              and the minimum number of people.
            </li>
            <li className="numbered">
              If the facility is available only for SUNY Korea, user should be
              in SUNY Korea
            </li>
            <li className="numbered">
              The reservation date must be made on the available day of the week
            </li>
            <li className="numbered">
              The same person cannot book another facility on the same date.
            </li>
            <p>If all conditions are met, data is stored in local storage.</p>
          </ol>
          <li>
            <h3>User Information</h3>
          </li>
          <ol>
            <li className="numbered">
              user profile, user email, user password, user name
            </li>
            <li className="numbered">
              All other details can be modified except for the user email.
            </li>
            <li className="numbered">
              If the user profile is changed, the image in the navbar will also
              change.
            </li>
          </ol>
          <li>
            <h3>Reservation History</h3>
          </li>
          <p>Load the reservation data stored in the local storage.</p>
          <p>
            reservation id, facility name, purpose, peopleNum, isSUNY, booker
            name, date
          </p>
          <p>Can cancel reservation</p>
        </ul>
      </ul>
    </div>
  );
}

export default Home;
