package com.bank.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * ENTITY Transaction = satu baris mutasi pada sebuah rekening.
 * Setiap setor/tarik/transfer/bunga menghasilkan satu baris di sini,
 * sehingga riwayat lengkap dan bisa diaudit.
 *
 * Banyak Transaction bisa dimiliki satu Account -> @ManyToOne.
 */
@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "account_id")
    private Account account;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;

    // Saldo SETELAH transaksi diterapkan (memudahkan baca mutasi).
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal balanceAfter;

    private String description;

    @Column(nullable = false)
    private LocalDateTime timestamp;
}
