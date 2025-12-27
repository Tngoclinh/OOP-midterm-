package com.hospital.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.entity.AccountEntity;
import com.hospital.payload.request.LoginRequest;
import com.hospital.payload.response.JwtResponse;
import com.hospital.service.AccountService;
import com.hospital.utils.JwtUtils;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AccountService accountService;
    
    private final JwtUtils jwtUtils;
    
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        try {
            System.out.println("loginRequest = " + loginRequest);
            AccountEntity account =  accountService.findByUsername(loginRequest.getUsername())
                    .orElseThrow(() -> new RuntimeException("Error: Wrong username or password."));
            
            if( account.getPassword().equals(loginRequest.getPassword())) {
                String jwt = jwtUtils.generateToken(account);
                return ResponseEntity.ok(new JwtResponse(jwt));
            } else {
                throw new RuntimeException("Error: Wrong username or password.");
            }
        } catch (Exception e) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Wrong username or password.");
        }
    }
}
