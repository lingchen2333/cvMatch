package com.lingchen.cvMatch.service.user;

import com.lingchen.cvMatch.dto.UserDto;
import com.lingchen.cvMatch.model.User;
import com.lingchen.cvMatch.request.AddUserRequest;
import com.lingchen.cvMatch.request.UpdateUserRequest;

public interface IUserService {
    User getUserById(Long userId);
    User addUser(AddUserRequest request);
    User updateUser(UpdateUserRequest request);

    User getAuthenticatedUser();
    UserDto convertToDto(User user);
}
