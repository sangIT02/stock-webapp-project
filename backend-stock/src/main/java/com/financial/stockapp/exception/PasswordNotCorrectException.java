package com.financial.stockapp.exception;

public class PasswordNotCorrectException extends RuntimeException {
    public PasswordNotCorrectException(String message) {
        super(message);
    }
}
