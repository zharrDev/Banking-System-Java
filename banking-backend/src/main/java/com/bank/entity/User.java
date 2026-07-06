package com.bank.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * ENTITY User = satu baris di tabel "users".
 *
 * Gaya kode mengikuti projekmu: memakai Lombok agar ringkas.
 * 
 * @Getter @Setter -> otomatis membuat getter & setter
 * @NoArgsConstructor -> constructor kosong (wajib untuk JPA)
 * @AllArgsConstructor -> constructor dengan semua field
 * @Builder -> pola builder: User.builder().email(...).build()
 *
 *          Perubahan dari versimu: ditambahkan field "role" untuk membedakan
 *          ADMIN dan CUSTOMER (dipakai untuk hak akses).
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullname;

    @Column(unique = true, nullable = false)
    private String email;

    // Disimpan dalam bentuk hash BCrypt, BUKAN teks asli.
    @Column(nullable = false)
    private String password;

    @Column(unique = true)
    private String phone;

    // Peran pengguna. Disimpan sebagai teks ("ADMIN"/"CUSTOMER").
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
}
