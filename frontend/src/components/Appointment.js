import React, { useState } from 'react';
import axios from 'axios';

// createAppointment form as a prop
const AppointmentForm = () => {
  const [appointmentDetails, setAppointmentDetails] = useState('');
  const [patientName, setPatientName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCreateAppointment = () => {
    // Validate the input
    if (!appointmentDetails.trim() || !patientName.trim()) {
        setError('Fields cannot be empty');
        setMessage("");
        return;
    }

    // Create an appointment object
    const newAppointment = {
      appointmentDetails,
      patientName,
    };

    // Send the appointment object to the createAppointment function
    createAppointment(newAppointment);

    // Clear the form fields after submitting
    setAppointmentDetails('');
    setPatientName('');
    setMessage("Appointment Created");
    setError("");
  };
  
  const createAppointment = (appointment) => {
    console.log(JSON.stringify(appointment));

      axios.post('http://localhost:8081/appointments', appointment)
      .then(response => {
        console.log('Appointment created:', response.data);
      })
      .catch(error => {
        console.error('Error creating appointment:', error);
        if(error.response) {
          //     console.log(error.response.data);
          //     console.log(error.response.status);
          //     console.log(error.response.headers);
        }
        // Handle errors as needed
      });
      
  };

  return (
    <div>
      <h2>Create Appointment</h2>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>
            Appointment Details:
            <input
            type="text"
            value={appointmentDetails}
            onChange={(e) => setAppointmentDetails(e.target.value)}
            />
        </label>
      </div>

      <div>
        <label>
            Patient Name:
            <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            />
        </label>
      </div>
      <button onClick={handleCreateAppointment}>Create Appointment</button>
    </div>
  );
};

export default AppointmentForm;
