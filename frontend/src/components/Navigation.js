// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/appointment">Appointments</Link>
        </li>
        <li>
          <Link to="/doctor">Doctors</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
