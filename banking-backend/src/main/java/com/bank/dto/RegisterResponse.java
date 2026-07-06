package com.bank.dto;

import lombok.Builder;
import lombok.Data;

/**
 * Respons setelah registrasi berhasil (mengikuti versimu, tetap dipertahankan).
 * 
 * @Data -> getter, setter, toString, equals, hashCode otomatis
 * @Builder -> pola builder: RegisterResponse.builder()...build()
 */
@Data
@Builder
public class RegisterResponse {

    private Long id;
    private String fullname;
    private String email;
    private String phone;
    private String accountNumber;
}
