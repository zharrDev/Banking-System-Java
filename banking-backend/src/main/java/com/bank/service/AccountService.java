package com.bank.service;

import com.bank.dto.AccountResponse;
import com.bank.dto.TransactionResponse;
import com.bank.dto.TransferRequest;
import com.bank.entity.*;
import com.bank.exception.ApiException;
import com.bank.repository.AccountRepository;
import com.bank.repository.TransactionRepository;
import com.bank.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Logika bisnis perbankan: cek saldo, setor, tarik, transfer, riwayat, bunga.
 *
 * Karena relasi User-Account adalah OneToOne, tiap user punya tepat satu
 * rekening. Jadi operasi mengacu ke "rekening milik user yang sedang login".
 *
 * @Transactional menjamin operasi all-or-nothing (penting untuk transfer).
 */
@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public AccountService(AccountRepository accountRepository,
            TransactionRepository transactionRepository,
            UserRepository userRepository) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    /** Info rekening milik user yang login. */
    public AccountResponse myAccount(String email) {
        return toAccountResponse(getAccountByEmail(email));
    }

    /** Setor tunai. */
    @Transactional
    public AccountResponse deposit(String email, BigDecimal amount) {
        Account account = getAccountByEmail(email);
        account.setBalance(account.getBalance().add(amount));
        accountRepository.save(account);
        recordTransaction(account, TransactionType.DEPOSIT, amount, "Setor tunai");
        return toAccountResponse(account);
    }

    /** Tarik tunai (saldo harus cukup). */
    @Transactional
    public AccountResponse withdraw(String email, BigDecimal amount) {
        Account account = getAccountByEmail(email);
        if (account.getBalance().compareTo(amount) < 0) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Saldo tidak mencukupi");
        }
        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);
        recordTransaction(account, TransactionType.WITHDRAWAL, amount, "Tarik tunai");
        return toAccountResponse(account);
    }

    /** Transfer ke rekening lain. */
    @Transactional
    public AccountResponse transfer(String email, TransferRequest req) {
        Account from = getAccountByEmail(email);
        Account to = accountRepository.findByAccountNumber(req.getToAccountNumber())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Rekening tujuan tidak ditemukan"));

        if (from.getAccountNumber().equals(to.getAccountNumber())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Tidak bisa transfer ke rekening sendiri");
        }
        if (from.getBalance().compareTo(req.getAmount()) < 0) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Saldo tidak mencukupi");
        }

        from.setBalance(from.getBalance().subtract(req.getAmount()));
        to.setBalance(to.getBalance().add(req.getAmount()));
        accountRepository.save(from);
        accountRepository.save(to);

        String desc = req.getDescription() == null ? "" : " - " + req.getDescription();
        recordTransaction(from, TransactionType.TRANSFER_OUT, req.getAmount(),
                "Transfer ke " + to.getAccountNumber() + desc);
        recordTransaction(to, TransactionType.TRANSFER_IN, req.getAmount(),
                "Transfer dari " + from.getAccountNumber() + desc);

        return toAccountResponse(from);
    }

    /** Riwayat mutasi rekening milik user. */
    public List<TransactionResponse> history(String email) {
        Account account = getAccountByEmail(email);
        return transactionRepository.findByAccountOrderByTimestampDesc(account).stream()
                .map(this::toTransactionResponse)
                .toList();
    }

    // ===================== Fungsi ADMIN =====================

    /** Admin: lihat semua rekening. */
    public List<AccountResponse> allAccounts() {
        return accountRepository.findAll().stream()
                .map(this::toAccountResponse)
                .toList();
    }

    /** Admin: terapkan bunga ke semua rekening. */
    @Transactional
    public int applyInterestToAll() {
        List<Account> accounts = accountRepository.findAll();
        for (Account account : accounts) {
            BigDecimal interest = account.getBalance()
                    .multiply(account.getInterestRate())
                    .setScale(2, RoundingMode.HALF_UP);
            if (interest.compareTo(BigDecimal.ZERO) > 0) {
                account.setBalance(account.getBalance().add(interest));
                accountRepository.save(account);
                recordTransaction(account, TransactionType.INTEREST, interest, "Bunga rekening");
            }
        }
        return accounts.size();
    }

    // ===================== Helper =====================

    private Account getAccountByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User tidak ditemukan"));
        return accountRepository.findByUser(user)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Rekening tidak ditemukan"));
    }

    private void recordTransaction(Account account, TransactionType type,
            BigDecimal amount, String description) {
        Transaction tx = Transaction.builder()
                .account(account)
                .type(type)
                .amount(amount)
                .balanceAfter(account.getBalance())
                .description(description)
                .timestamp(LocalDateTime.now())
                .build();
        transactionRepository.save(tx);
    }

    private AccountResponse toAccountResponse(Account a) {
        return AccountResponse.builder()
                .accountNumber(a.getAccountNumber())
                .balance(a.getBalance())
                .interestRate(a.getInterestRate())
                .ownerName(a.getUser().getFullname())
                .ownerEmail(a.getUser().getEmail())
                .build();
    }

    private TransactionResponse toTransactionResponse(Transaction t) {
        return TransactionResponse.builder()
                .id(t.getId())
                .type(t.getType())
                .amount(t.getAmount())
                .balanceAfter(t.getBalanceAfter())
                .description(t.getDescription())
                .timestamp(t.getTimestamp())
                .build();
    }
}
