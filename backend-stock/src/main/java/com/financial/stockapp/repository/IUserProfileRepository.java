package com.financial.stockapp.repository;

import com.financial.stockapp.entity.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserProfileRepository extends JpaRepository<UserProfile,Long> {
}
