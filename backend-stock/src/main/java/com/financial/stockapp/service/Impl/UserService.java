package com.financial.stockapp.service.Impl;

import com.financial.stockapp.dto.request.UserLoginRequest;
import com.financial.stockapp.dto.response.LoginResponse;
import com.financial.stockapp.dto.response.UserInfoResponse;
import com.financial.stockapp.entity.CustomUserDetails;
import com.financial.stockapp.entity.User;
import com.financial.stockapp.exception.PasswordNotCorrectException;
import com.financial.stockapp.exception.UserNotFoundException;
import com.financial.stockapp.repository.IUserRepository;
import com.financial.stockapp.service.IUserService;
import com.financial.stockapp.util.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final IUserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;

    public LoginResponse login(UserLoginRequest dto) {
        User user = userRepository.getUserByPhone(dto.getPhone());
        if(user == null){
            throw new UserNotFoundException("User chưa tồn tại");
        }
        boolean isMatch = encoder.matches(dto.getPassword(), user.getPasswordHash());
        if(!isMatch){
            throw new PasswordNotCorrectException("Mật khẩu không chính xác");
        }
        CustomUserDetails userDetails = new CustomUserDetails(user);
        String token = jwtUtils.generateToken(userDetails);
        UserInfoResponse userInfoResponse = UserInfoResponse.builder()
                .fullname(user.getFullName())
                .id(user.getId())
                .phone(user.getPhone())
                .email(user.getEmail())
                .is_kyc_verify(user.getIsKycVerified())
                .build();

        LoginResponse response = LoginResponse.builder()
                .userInfoResponse(userInfoResponse)
                .accessToken(token)
                .expiresIn(86400)
                .tokenType("Bearer").build();
        return response;
    }
}
