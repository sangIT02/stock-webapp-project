package com.financial.stockapp.dto.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginRequest {

    @JsonProperty("phone_number")
    private String phone;

    private String password;
}
