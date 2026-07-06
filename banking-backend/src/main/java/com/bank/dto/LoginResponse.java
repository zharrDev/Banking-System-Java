package com.bank.dto;

import lombok.Builder;
import lombok.Data;

/**
 * Respons setelah login berhasil: berisi token JWT + info dasar user.
 */
@Data
@Builder
public class LoginResponse {

    private String token;
    private String email;
    private String role;
}
