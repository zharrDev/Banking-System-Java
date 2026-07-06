package com.bank.dto;

import com.bank.entity.TransactionType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Respons satu baris mutasi.
 */
@Data
@Builder
public class TransactionResponse {

    private Long id;
    private TransactionType type;
    private BigDecimal amount;
    private BigDecimal balanceAfter;
    private String description;
    private LocalDateTime timestamp;
}
