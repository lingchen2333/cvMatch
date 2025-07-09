package com.lingchen.cvMatch.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserRequest {

    @Size(max = 20)
    private String firstName;


    @Size(max = 20)
    private String lastName;

//    @NotBlank
    @Size(max = 120, min = 6)
    private String password;
}
