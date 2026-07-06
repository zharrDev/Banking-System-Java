package com.bank.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Data untuk login. Memakai email + password (sesuai desain projekmu).
 * 
 * @Email & @NotBlank = validasi otomatis sebelum masuk ke controller.
 */
@Data
public class LoginRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
}
