import React, { useState,useEffect } from 'react';

import { Navigate } from 'react-router-dom';
import {useAuth} from '../context/Authcontext';
import axios from "axios";

const DoctorComponent = () => {
  const { isAuthenticated, logout } = useAuth();

  // Assuming you have a list of appointments from your API
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: 'John Doe',  status: 'Pending' },
    { id: 2, patientName: 'Jane Smith', status: 'Pending' },
    // Add more appointments as needed
  ]);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    // Fetch appointments from the API
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8081/appointments', {
          auth: {
            username: 'doctor',
            password: 'doctor',
          },
        });
        console.log(response.data);
        setAppointments(response.data);
        setShouldRefetch(false);
      } catch (error) {
        console.error('Error fetching appointments:', error.message);
      }
    };

    // Call the function to fetch appointments
    fetchAppointments();
  }, [shouldRefetch]); // Empty dependency array ensures the effect runs only once when the component mounts


  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  const handleAccept = async (id) => {
    // Update the status of the appointment to 'Accepted' in the backend
    try {
      const response = await axios.put(
        `http://localhost:8081/appointments/${id}?status=accepted`,
        {},
        {
          auth: {
            username: 'doctor',
            password: 'doctor',
          },
        }
      );
      // Update the status locally after a successful API call
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === id ? { ...appointment, status: 'Accepted' } : appointment
        )
      );
      setShouldRefetch(true);
    } catch (error) {
      console.error('Error updating appointment status:', error.message);
    }
  };

  const handleReject = async (id) => {
    // Update the status of the appointment to 'Rejected' in the backend
    try {
      const response = await axios.put(
        `http://localhost:8081/appointments/${id}?status=rejected`,
        {},
        {
          auth: {
            username: 'doctor',
            password: 'doctor',
          },
        }
      );
      // Update the status locally after a successful API call
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === id ? { ...appointment, status: 'Rejected' } : appointment
        )
      );
      setShouldRefetch(true);
    } catch (error) {
      console.error('Error updating appointment status:', error.message);
    }
  };

  return (
    <div>
      <h2>Doctor Component</h2>
      <button type="button" onClick={logout}>
          Logout
        </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient Name</th>
            <th>Details</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? "No appointments available" : appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.appointmentDetails}</td>
              <td>
              {appointment.status === 'rejected' && <div style={{ color: 'red' }}>{"Rejected"}</div>}
                {appointment.status === 'accepted' && <div style={{ color: 'green' }}>{"Accepted"}</div>}
                {appointment.status === 'pending' && <div style={{ color: 'blue' }}>{"Pending"}</div>}
              </td>
              <td>
                {appointment.status === 'pending' && (
                  <>
                    <button onClick={() => handleAccept(appointment.id)}>Accept</button>
                    <button onClick={() => handleReject(appointment.id)}>Reject</button>
                  </>
                )}
                {(appointment.status === 'rejected' || appointment.status === 'accepted') && <div style={{ color: 'black' }}>{"Completed"}</div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    
  );
};

export default DoctorComponent;
