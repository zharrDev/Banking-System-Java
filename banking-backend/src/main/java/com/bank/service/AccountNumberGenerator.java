package com.bank.service;

import com.bank.repository.AccountRepository;
import org.springframework.stereotype.Component;

/**
 * Komponen kecil untuk membuat nomor rekening unik: ACC + 7 digit urutan.
 * Dipisah agar logikanya bisa dipakai ulang dan mudah diuji.
 */
@Component
public class AccountNumberGenerator {

    private final AccountRepository accountRepository;

    public AccountNumberGenerator(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public String generate() {
        long next = accountRepository.count() + 1;
        String candidate;
        do {
            candidate = String.format("ACC%07d", next);
            next++;
        } while (accountRepository.findByAccountNumber(candidate).isPresent());
        return candidate;
    }
}
