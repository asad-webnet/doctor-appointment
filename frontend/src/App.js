// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Appointment from './components/Appointment';
import Doctor from './components/Doctor';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
