package com.bank.service;

import com.bank.dto.LoginRequest;
import com.bank.dto.LoginResponse;
import com.bank.dto.RegisterResponse;
import com.bank.config.JwtService;
import com.bank.entity.Account;
import com.bank.entity.Role;
import com.bank.entity.User;
import com.bank.exception.ApiException;
import com.bank.repository.AccountRepository;
import com.bank.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

/**
 * Logika registrasi & login.
 *
 * registerNewUser mempertahankan idemu: saat user daftar, otomatis dibuatkan
 * satu rekening (relasi OneToOne). Ditambah: hash password, set role CUSTOMER,
 * dan saldo + bunga awal.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AccountNumberGenerator accountNumberGenerator;

    public AuthService(UserRepository userRepository,
            AccountRepository accountRepository,
            BCryptPasswordEncoder passwordEncoder,
            JwtService jwtService,
            AccountNumberGenerator accountNumberGenerator) {
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.accountNumberGenerator = accountNumberGenerator;
    }

    /**
     * Daftar user baru + buat rekening otomatis.
     * 
     * @Transactional: kalau gagal di tengah, semuanya dibatalkan.
     */
    @Transactional
    public RegisterResponse register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ApiException(HttpStatus.CONFLICT, "Email sudah terdaftar");
        }

        // Amankan password & tetapkan role.
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(Role.CUSTOMER);
        User savedUser = userRepository.save(user);

        // Buat rekening untuk user ini.
        Account account = Account.builder()
                .accountNumber(accountNumberGenerator.generate())
                .balance(BigDecimal.ZERO)
                .interestRate(new BigDecimal("0.05"))
                .user(savedUser)
                .build();
        accountRepository.save(account);

        return RegisterResponse.builder()
                .id(savedUser.getId())
                .fullname(savedUser.getFullname())
                .email(savedUser.getEmail())
                .phone(savedUser.getPhone())
                .accountNumber(account.getAccountNumber())
                .build();
    }

    /** Login: cek email & password, lalu beri token JWT. */
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Email atau password salah"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED, "Email atau password salah");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
        return LoginResponse.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}
