package com.financial.stockapp.entity;

import jakarta.persistence.Embeddable;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDate;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryBarId implements Serializable {
    private Long stockId;
    private LocalDate tradingDate;
}