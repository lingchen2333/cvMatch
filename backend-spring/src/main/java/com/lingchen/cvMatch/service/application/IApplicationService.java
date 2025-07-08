package com.lingchen.cvMatch.service.application;

import com.lingchen.cvMatch.dto.ApplicationDto;
import com.lingchen.cvMatch.model.Application;
import com.lingchen.cvMatch.request.AddApplicationRequest;
import com.lingchen.cvMatch.request.UpdateApplicationRequest;
import com.lingchen.cvMatch.response.ApplicationResponse;
import com.lingchen.cvMatch.response.ApplicationsMonthlyCountResponse;
import com.lingchen.cvMatch.response.sankeyResponse.SankeyResponse;

import java.util.List;
import java.util.Map;

public interface IApplicationService {
    ApplicationResponse getUserApplications(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
    ApplicationResponse getUserApplicationsByStatus(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String statusName);

    Application getApplicationById(long id);
    Application addApplication(AddApplicationRequest request);
    Application updateApplication(UpdateApplicationRequest request, Long id);
    void deleteApplicationById(long id);


    Map<String, Long> getApplicationStatusCounts();
    List<ApplicationsMonthlyCountResponse> getApplicationsMonthlyCount();
    SankeyResponse getApplicationSankeyData();

    ApplicationDto convertToDto(Application application);
}
