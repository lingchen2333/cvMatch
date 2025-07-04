package com.lingchen.cvMatch.service.status;

import com.lingchen.cvMatch.dto.StatusDto;
import com.lingchen.cvMatch.exception.ResourceNotFoundException;
import com.lingchen.cvMatch.model.Application;
import com.lingchen.cvMatch.model.Status;
import com.lingchen.cvMatch.model.User;
import com.lingchen.cvMatch.repository.ApplicationRepository;
import com.lingchen.cvMatch.repository.StatusRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatusService implements IStatusService {

    private final StatusRepository statusRepository;
    private final ModelMapper modelMapper;

    @Override
    public Status getStatusByName(String name) {
        return statusRepository.getStatusByName(name).orElseThrow(()-> new ResourceNotFoundException("status", "name", name));
    }

    @Override
    public List<Status> getAllStatuses() {
        return statusRepository.findAll();
    }

    @Override
    public StatusDto convertToDto(Status status) {
        return modelMapper.map(status, StatusDto.class);
    }


}
