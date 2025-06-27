package com.lingchen.cvMatch.service.application;

import com.lingchen.cvMatch.dto.ApplicationDto;
import com.lingchen.cvMatch.model.Application;
import com.lingchen.cvMatch.request.AddApplicationRequest;
import com.lingchen.cvMatch.request.UpdateApplicationRequest;
import com.lingchen.cvMatch.response.ApplicationResponse;

import java.util.List;

public interface IApplicationService {
    ApplicationResponse getApplicationsByUser(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
    Application getApplicationById(long id);
    Application addApplication(AddApplicationRequest request);
    Application updateApplication(UpdateApplicationRequest request, Long id);
    void deleteApplicationById(long id);

    ApplicationDto convertToDto(Application application);
}
