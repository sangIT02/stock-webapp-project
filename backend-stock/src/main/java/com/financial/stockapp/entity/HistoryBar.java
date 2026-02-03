package com.financial.stockapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "mkt_history_bars")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoryBar {

    @EmbeddedId
    private HistoryBarId id;

    // Mapping lại để dùng quan hệ object, insertable=false vì đã map trong EmbeddedId
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("stockId")
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @Column(name = "open", precision = 19, scale = 4)
    private BigDecimal open;

    @Column(name = "high", precision = 19, scale = 4)
    private BigDecimal high;

    @Column(name = "low", precision = 19, scale = 4)
    private BigDecimal low;

    @Column(name = "close", precision = 19, scale = 4)
    private BigDecimal close;

    private Long volume;
}