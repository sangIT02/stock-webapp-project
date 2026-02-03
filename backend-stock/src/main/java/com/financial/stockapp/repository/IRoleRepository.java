package com.financial.stockapp.repository;

import com.financial.stockapp.entity.Role;
import com.financial.stockapp.entity.enums.Enum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoleRepository extends JpaRepository<Role, Long> {
    Role getRoleByName(Enum.RoleType roleName);
}
