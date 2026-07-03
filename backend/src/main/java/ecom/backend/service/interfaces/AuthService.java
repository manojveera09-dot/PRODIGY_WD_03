package ecom.backend.service.interfaces;

import ecom.backend.dto.request.LoginRequest;
import ecom.backend.dto.request.RegisterRequest;
import ecom.backend.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

}