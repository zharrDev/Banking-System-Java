package com.bank.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

/**
 * Respons info rekening (tanpa membocorkan data internal/entity).
 */
@Data
@Builder
public class AccountResponse {

    private String accountNumber;
    private BigDecimal balance;
    private BigDecimal interestRate;
    private String ownerName;
    private String ownerEmail;
}
