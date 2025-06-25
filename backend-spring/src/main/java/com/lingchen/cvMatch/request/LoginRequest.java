package com.lingchen.cvMatch.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    @NotBlank(message = "Invalid login credentials")
    private String email;

    @NotBlank(message = "Invalid login credentials")
    private String password;
}
