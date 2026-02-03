package com.financial.stockapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ptf_watchlists")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Watchlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(length = 100)
    @Builder.Default
    private String name = "Danh mục theo dõi";

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "ptf_watchlist_items",
            joinColumns = @JoinColumn(name = "watchlist_id"),
            inverseJoinColumns = @JoinColumn(name = "stock_id")
    )
    @Builder.Default
    private Set<Stock> stocks = new HashSet<>();
}