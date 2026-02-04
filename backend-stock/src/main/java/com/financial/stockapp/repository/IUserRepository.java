package com.financial.stockapp.repository;

import com.financial.stockapp.dto.response.UserInfoResponse;
import com.financial.stockapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<User,Long> {
    Optional<User> findByPhone(String phone);

    User getUserByPhone(String phone);

}
