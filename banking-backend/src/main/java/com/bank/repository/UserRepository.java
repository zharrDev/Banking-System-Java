package com.bank.repository;

import com.bank.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository User. Spring Data JPA otomatis membuat implementasinya.
 * Nama method diterjemahkan menjadi query: findByEmail -> WHERE email = ?
 */
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
