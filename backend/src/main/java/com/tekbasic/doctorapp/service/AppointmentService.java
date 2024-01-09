package com.tekbasic.doctorapp.service;

import com.tekbasic.doctorapp.model.Appointment;
import com.tekbasic.doctorapp.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;

    @Autowired
    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    public Appointment createAppointment(Appointment appointment) {
        appointment.setStatus("pending"); // Set default status
        return appointmentRepository.save(appointment);
    }

    public Optional<Appointment> updateAppointmentStatus(Long id, String newStatus) {
        return appointmentRepository.findById(id).map(appointment -> {
            appointment.setStatus(newStatus);
            return appointmentRepository.save(appointment);
        });
    }
}

