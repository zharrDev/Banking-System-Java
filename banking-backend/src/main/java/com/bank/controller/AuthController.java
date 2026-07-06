package com.bank.controller;

import com.bank.dto.LoginRequest;
import com.bank.dto.LoginResponse;
import com.bank.dto.RegisterResponse;
import com.bank.entity.User;
import com.bank.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Endpoint registrasi & login (publik, tanpa perlu token).
 *
 * Catatan: menggantikan BankService dengan AuthService (service dipisah).
 * Constructor injection dipakai sebagai ganti @Autowired field.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody User user) {
        return ResponseEntity.ok(authService.register(user));
    }

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
