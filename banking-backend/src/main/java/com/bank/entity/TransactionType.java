package com.bank.entity;

/**
 * Jenis transaksi yang dicatat pada mutasi rekening.
 * - DEPOSIT : setor (saldo bertambah)
 * - WITHDRAWAL : tarik (saldo berkurang)
 * - TRANSFER_OUT : transfer keluar (saldo berkurang)
 * - TRANSFER_IN : transfer masuk (saldo bertambah)
 * - INTEREST : bunga ditambahkan ke saldo
 */
public enum TransactionType {
    DEPOSIT,
    WITHDRAWAL,
    TRANSFER_OUT,
    TRANSFER_IN,
    INTEREST
}
