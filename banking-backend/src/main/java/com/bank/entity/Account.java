package com.bank.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

/**
 * ENTITY Account = rekening milik seorang user.
 *
 * Mengikuti desainmu: relasi @OneToOne (satu user punya satu rekening).
 *
 * Catatan UANG: pakai BigDecimal, bukan double. Alasannya double tidak
 * presisi untuk desimal (0.1 + 0.2 != 0.3), sedangkan uang harus tepat.
 *
 * Tambahan dari versimu: field "interestRate" (suku bunga) untuk fitur bunga.
 */
@Entity
@Table(name = "accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String accountNumber;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal balance;

    // Suku bunga tahunan, mis. 0.05 = 5%.
    @Column(nullable = false, precision = 6, scale = 4)
    private BigDecimal interestRate;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
