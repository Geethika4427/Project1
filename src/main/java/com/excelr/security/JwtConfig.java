package com.excelr.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

    @Value("${jwt.secret.key}")
    private String secretKeyProperty;

    @Bean
    public String secretKey() {
        if (secretKeyProperty == null || secretKeyProperty.isEmpty()) {
            throw new IllegalArgumentException("JWT secret key is not set.");
        }
        return secretKeyProperty;
    }
}