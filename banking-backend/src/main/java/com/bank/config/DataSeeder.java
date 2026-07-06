package com.bank.config;

import com.bank.entity.Role;
import com.bank.entity.User;
import com.bank.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Membuat akun ADMIN default saat aplikasi pertama dijalankan
 * (registrasi publik hanya membuat CUSTOMER).
 *
 * email : admin@bank.com
 * password: admin123
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@bank.com")) {
            User admin = User.builder()
                    .fullname("Administrator")
                    .email("admin@bank.com")
                    .password(passwordEncoder.encode("admin123"))
                    .phone("0000000000")
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            System.out.println(">>> Akun admin dibuat -> email: admin@bank.com, password: admin123");
        }
    }
}
