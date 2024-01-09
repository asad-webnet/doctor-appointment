package com.tekbasic.doctorapp.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;


@AllArgsConstructor
public class Response {

    HttpStatus code;
    String message;


}
