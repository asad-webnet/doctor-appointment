package com.tekbasic.doctorapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticateController {

    @GetMapping("/login")
    private ResponseEntity<?> login(
            @RequestHeader("username") String username,
            @RequestHeader("password") String password) {

        if(username.equals("doctor") && password.equals("doctor"))
        {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
