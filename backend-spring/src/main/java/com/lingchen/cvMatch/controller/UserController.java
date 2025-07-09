package com.lingchen.cvMatch.controller;


import com.lingchen.cvMatch.dto.UserDto;
import com.lingchen.cvMatch.model.User;
import com.lingchen.cvMatch.request.AddUserRequest;
import com.lingchen.cvMatch.request.UpdateUserRequest;
import com.lingchen.cvMatch.response.ApiResponse;
import com.lingchen.cvMatch.service.user.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/users")
public class UserController {

    private final IUserService userService;


    @GetMapping
    public ResponseEntity<ApiResponse> getAuthenticatedUser() {
        User user = userService.getAuthenticatedUser();
        UserDto userDto = userService.convertToDto(user);
        return ResponseEntity.ok(new ApiResponse("User get successfully", userDto));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        UserDto userDto = userService.convertToDto(user);
        return ResponseEntity.ok(new ApiResponse("User get successfully", userDto));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> addUser(@Valid @RequestBody AddUserRequest request) {
        User user = userService.addUser(request);
        UserDto userDto = userService.convertToDto(user);
        return ResponseEntity.ok(new ApiResponse("User added successfully", userDto));
    }

    @PutMapping()
    public ResponseEntity<ApiResponse> updateAuthenticatedUser(@Valid @RequestBody UpdateUserRequest request) {
        User user = userService.updateUser(request);
        UserDto userDto = userService.convertToDto(user);
        return ResponseEntity.ok(new ApiResponse("User updated successfully", userDto));
    }
}
