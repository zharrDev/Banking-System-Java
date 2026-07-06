package com.bank.entity;

/**
 * Enum = tipe data dengan sekumpulan nilai tetap.
 * Peran pengguna:
 * - ADMIN : bisa melihat semua akun & menerapkan bunga.
 * - CUSTOMER : nasabah biasa, hanya akses rekening miliknya.
 */
public enum Role {
    ADMIN,
    CUSTOMER
}
