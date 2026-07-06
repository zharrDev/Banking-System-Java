package com.bank.controller;

import com.bank.dto.AccountResponse;
import com.bank.dto.AmountRequest;
import com.bank.dto.TransactionResponse;
import com.bank.dto.TransferRequest;
import com.bank.service.AccountService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * Endpoint untuk nasabah (perlu token JWT).
 *
 * Principal otomatis berisi identitas user yang login (email dari token),
 * jadi kita tahu siapa pemilik request tanpa mengirim email dari client.
 */
@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    // GET /api/accounts/me -> info rekening saya
    @GetMapping("/me")
    public AccountResponse myAccount(Principal principal) {
        return accountService.myAccount(principal.getName());
    }

    // POST /api/accounts/deposit
    @PostMapping("/deposit")
    public AccountResponse deposit(Principal principal, @Valid @RequestBody AmountRequest request) {
        return accountService.deposit(principal.getName(), request.getAmount());
    }

    // POST /api/accounts/withdraw
    @PostMapping("/withdraw")
    public AccountResponse withdraw(Principal principal, @Valid @RequestBody AmountRequest request) {
        return accountService.withdraw(principal.getName(), request.getAmount());
    }

    // POST /api/accounts/transfer
    @PostMapping("/transfer")
    public AccountResponse transfer(Principal principal, @Valid @RequestBody TransferRequest request) {
        return accountService.transfer(principal.getName(), request);
    }

    // GET /api/accounts/transactions -> riwayat mutasi saya
    @GetMapping("/transactions")
    public List<TransactionResponse> history(Principal principal) {
        return accountService.history(principal.getName());
    }
}
