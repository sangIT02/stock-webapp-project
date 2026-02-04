package com.financial.stockapp.service;

import com.financial.stockapp.dto.request.UserLoginRequest;
import com.financial.stockapp.dto.response.LoginResponse;
import com.financial.stockapp.dto.response.UserInfoResponse;
import com.financial.stockapp.entity.User;

public interface IUserService {
    LoginResponse login(UserLoginRequest dto);
}
