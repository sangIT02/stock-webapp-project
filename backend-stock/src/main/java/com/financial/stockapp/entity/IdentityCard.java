package com.financial.stockapp.entity;

import com.financial.stockapp.entity.enums.Enum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "auth_identity_cards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdentityCard extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Quan hệ 1-1 với User
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @ToString.Exclude // Quan trọng: Ngắt vòng lặp toString của Lombok
    @EqualsAndHashCode.Exclude
    private User user;

    // --- Thông tin trích xuất từ OCR ---

    @Column(name = "card_number", unique = true, nullable = false, length = 20)
    private String cardNumber;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "dob")
    private LocalDate dob; // Ngày sinh

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Enum.Gender gender;

    @Column(name = "place_of_origin")
    private String placeOfOrigin; // Quê quán

    @Column(name = "place_of_residence")
    private String placeOfResidence; // Thường trú

    @Column(name = "issue_date")
    private LocalDate issueDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "issue_place")
    private String issuePlace;

    // --- Hình ảnh (Lưu URL từ Cloud) ---

    @Column(name = "front_image_url", length = 500)
    private String frontImageUrl;

    @Column(name = "back_image_url", length = 500)
    private String backImageUrl;

    @Column(name = "face_image_url", length = 500)
    private String faceImageUrl;

    // --- Trạng thái duyệt ---

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    @Builder.Default // Set mặc định khi dùng Builder
    private Enum.KycStatus status = Enum.KycStatus.PENDING;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;
}