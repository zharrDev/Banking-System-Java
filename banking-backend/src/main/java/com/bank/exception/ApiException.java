package com.bank.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * Exception khusus aplikasi: membawa HTTP status agar response rapi.
 * 
 * @Getter (Lombok) otomatis membuat getStatus().
 */
@Getter
public class ApiException extends RuntimeException {

    private final HttpStatus status;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }
}
