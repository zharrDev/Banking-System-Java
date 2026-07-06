package com.bank.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

/**
 * Data untuk transfer ke rekening lain.
 */
@Data
public class TransferRequest {

    @NotBlank
    private String toAccountNumber;

    @NotNull
    @DecimalMin(value = "0.01", message = "Jumlah harus lebih dari 0")
    private BigDecimal amount;

    private String description;
}
