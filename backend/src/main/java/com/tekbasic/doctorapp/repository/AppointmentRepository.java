package com.tekbasic.doctorapp.repository;

import com.tekbasic.doctorapp.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}

