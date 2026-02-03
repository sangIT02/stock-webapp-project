package com.financial.stockapp.entity;

import com.financial.stockapp.entity.enums.Enum;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "trd_orders", indexes = {
        @Index(name = "idx_user_orders", columnList = "user_id, created_at")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stock_id", nullable = false)
    private Stock stock;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Enum.OrderSide side;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Enum.OrderType type;

    @Column(name = "request_price", precision = 19, scale = 4)
    private BigDecimal requestPrice;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "filled_quantity")
    @Builder.Default
    private Integer filledQuantity = 0;

    @Column(name = "avg_filled_price", precision = 19, scale = 4)
    private BigDecimal avgFilledPrice;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Enum.OrderStatus status = Enum.OrderStatus.PENDING;

    @Column(name = "cancellation_reason")
    private String cancellationReason;

    // Quan hệ 1-N với Executions
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Execution> executions = new ArrayList<>();
}