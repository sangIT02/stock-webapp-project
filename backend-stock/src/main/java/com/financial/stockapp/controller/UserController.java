package com.financial.stockapp.controller;

import com.financial.stockapp.dto.ApiResponse;
import com.financial.stockapp.dto.request.RegisterRequestDTO;
import com.financial.stockapp.dto.request.VerifyOtpDto;
import com.financial.stockapp.service.Impl.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private AuthService authService;

    @PostMapping("/sent-otp")
    public ApiResponse<String> sendOtp(@RequestParam String email) {
        authService.generateAndSendOtp(email);
        return ApiResponse.<String>builder()
                .message("Mã OTP đã được gửi tới email của bạn")
                .build();
    }

    @PostMapping("/verify-otp")
    public ApiResponse<String> verifyOtp(@RequestBody VerifyOtpDto otp){
        boolean rs = authService.verifyOtp(otp.getEmail(),otp.getOtp());
        String ms = rs ? "verify thành công ":"verify thất bại";
        return ApiResponse.<String>builder()
                .data(ms)
                .code(200)
                .build();
    }

    @PostMapping("/register")
    public ApiResponse<?> register(@RequestBody RegisterRequestDTO dto){
        authService.register(dto);
        return ApiResponse.builder()
                .code(200)
                .data("success")
                .message("dang ki thanh cong")
                .build();
    }
}
