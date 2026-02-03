package com.financial.stockapp.service;


import com.financial.stockapp.dto.request.RegisterRequestDTO;

public interface IAuService {
    void generateAndSendOtp(String email);
    boolean verifyOtp(String email, String opt);

    void register(RegisterRequestDTO dto);
}
