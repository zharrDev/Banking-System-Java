package com.bank.controller;

import com.bank.dto.AccountResponse;
import com.bank.service.AccountService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Endpoint khusus ADMIN.
 * Pengamanan berlapis: SecurityConfig (/api/admin/** -> ADMIN) + @PreAuthorize.
 */
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AccountService accountService;

    public AdminController(AccountService accountService) {
        this.accountService = accountService;
    }

    // GET /api/admin/accounts -> semua rekening
    @GetMapping("/accounts")
    public List<AccountResponse> allAccounts() {
        return accountService.allAccounts();
    }

    // POST /api/admin/apply-interest -> bunga ke semua rekening
    @PostMapping("/apply-interest")
    public Map<String, Object> applyInterest() {
        int count = accountService.applyInterestToAll();
        return Map.of(
                "message", "Bunga berhasil diterapkan",
                "accountsProcessed", count);
    }
}
