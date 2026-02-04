package com.financial.stockapp.service.Impl;

import com.financial.stockapp.dto.request.RegisterRequestDTO;
import com.financial.stockapp.entity.Role;
import com.financial.stockapp.entity.User;
import com.financial.stockapp.entity.UserProfile;
import com.financial.stockapp.entity.Wallet;
import com.financial.stockapp.entity.enums.Enum;
import com.financial.stockapp.exception.UserNotFoundException;
import com.financial.stockapp.repository.IRoleRepository;
import com.financial.stockapp.repository.IUserProfileRepository;
import com.financial.stockapp.repository.IUserRepository;
import com.financial.stockapp.repository.IWalletRepository;
import com.financial.stockapp.service.IAuService;
import com.financial.stockapp.service.IMailService;
import com.financial.stockapp.service.IRoleService;
import com.financial.stockapp.service.IUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuService {
    private final RedisTemplate<String, Object> redisTemplate; // Dùng cái bạn đã config JSON ấy
    private final MailService emailService;
    private final IUserRepository userRepository;
    private final PasswordEncoder encoder;
    private final IRoleRepository roleRepository;
    private final IWalletRepository walletRepository;
    private final IUserProfileRepository userProfileRepository;

    public void generateAndSendOtp(String email) {
        String otp = String.format("%06d",new Random().nextInt(999999));
        String key = "OTP" + email;
        redisTemplate.opsForValue().set(key,otp,3,  TimeUnit.MINUTES);
        emailService.sentOPTMail(email,otp);
    }

    public boolean verifyOtp(String email, String opt) {
        String key = "OTP" + email; // Key đã lưu trước đó
        Object redisOtp = redisTemplate.opsForValue().get(key);
        if(redisOtp == null){
            return false;
        }
        if(opt.equals(redisOtp.toString())){
            redisTemplate.delete(key);
            return true;
        }
        return false;
    }

    @Transactional
    public void register(RegisterRequestDTO dto) {
        String password = encoder.encode(dto.getPassword());
        Role role = roleRepository.getRoleByName(Enum.RoleType.ROLE_USER);
        User user = User.builder()
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .passwordHash(password)
                .isActive(true)
                .isKycVerified(false)
                .socialId("")
                .roles(new HashSet<>(Set.of(role)))
                .build();

        userRepository.save(user);
        Wallet wallet = Wallet.builder()
                .user(user) // Liên kết với User vừa tạo
                .balance(BigDecimal.ZERO)
                .availableBalance(BigDecimal.ZERO)
                .frozenBalance(BigDecimal.ZERO)
                .build();

        walletRepository.save(wallet);

        // 3. TẠO PROFILE - Để trống thông tin, chỉ cần liên kết
        UserProfile profile = UserProfile.builder()
                .user(user)
                .build(); // Các trường khác tự null

        userProfileRepository.save(profile);
    }
}