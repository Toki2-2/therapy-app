import { Link } from 'react-router-dom';

function HomePage({ logo }) {
  return (
    <div className="home-page">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>Therapy Management System</h1>
      <div className="navigation-buttons">
        <Link to="/therapist">
          <button className="nav-button">Therapist Page</button>
        </Link>
        <Link to="/client">
          <button className="nav-button">Client Page</button>
        </Link>
        <Link to="/session">
          <button className="nav-button">Session Page</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;