package com.bank.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

/**
 * Data untuk setor / tarik: cukup jumlah uang.
 * 
 * @DecimalMin memastikan jumlah lebih dari 0.
 */
@Data
public class AmountRequest {

    @NotNull
    @DecimalMin(value = "0.01", message = "Jumlah harus lebih dari 0")
    private BigDecimal amount;
}
