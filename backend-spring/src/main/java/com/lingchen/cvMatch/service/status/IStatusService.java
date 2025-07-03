package com.lingchen.cvMatch.service.status;

import com.lingchen.cvMatch.dto.StatusDto;
import com.lingchen.cvMatch.model.Application;
import com.lingchen.cvMatch.model.Status;
import com.lingchen.cvMatch.model.User;

import java.util.List;

public interface IStatusService {
    Status getStatusByName(String name);

    StatusDto convertToDto(Status status);
}
