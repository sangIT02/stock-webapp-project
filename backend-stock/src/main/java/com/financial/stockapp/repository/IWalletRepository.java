package com.financial.stockapp.repository;

import com.financial.stockapp.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IWalletRepository extends JpaRepository<Wallet,Long> {
}
