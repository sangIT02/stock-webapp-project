package com.financial.stockapp.entity;

import com.financial.stockapp.entity.enums.Enum;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "mkt_stocks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
public class Stock extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 10)
    private String symbol;

    @Column(name = "company_name")
    private String companyName;

    @Enumerated(EnumType.STRING)
    private Enum.Exchange exchange;

    @Column(name = "reference_price", precision = 19, scale = 4)
    private BigDecimal referencePrice;

    @Column(name = "ceiling_price", precision = 19, scale = 4)
    private BigDecimal ceilingPrice;

    @Column(name = "floor_price", precision = 19, scale = 4)
    private BigDecimal floorPrice;

    @Column(name = "is_tradable")
    @Builder.Default
    private Boolean isTradable = true;
}