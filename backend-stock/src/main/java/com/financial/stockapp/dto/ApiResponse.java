package com.financial.stockapp.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL) // Bỏ qua các field null khi trả về JSON (giúp gọn response)
public class ApiResponse<T> {

    private int code;      // Code logic (200, 400, 1001...)
    private String message; // Thông báo
    private T data;        // Dữ liệu chính (Generic)

    // Helper method: Phản hồi thành công
    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
                .code(200)
                .message("Success")
                .data(data)
                .build();
    }

    // Helper method: Phản hồi thành công kèm message tùy chỉnh
    public static <T> ApiResponse<T> success(T data, String message) {
        return ApiResponse.<T>builder()
                .code(200)
                .message(message)
                .data(data)
                .build();
    }

    // Helper method: Phản hồi lỗi
    public static <T> ApiResponse<T> error(int code, String message) {
        return ApiResponse.<T>builder()
                .code(code)
                .message(message)
                .data(null) // Lỗi thì data thường là null
                .build();
    }
}