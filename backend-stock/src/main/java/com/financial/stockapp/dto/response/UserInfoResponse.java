package com.financial.stockapp.dto.response;


import lombok.*;

import java.util.Date;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponse {
    private long id;
    private String email;
    private String phone;
    private String fullname;
    private String auth_provider;
    private boolean is_kyc_verify;
}
