package com.lingchen.cvMatch.controller;

import com.lingchen.cvMatch.config.AppConstants;
import com.lingchen.cvMatch.dto.ApplicationDto;
import com.lingchen.cvMatch.model.Application;
import com.lingchen.cvMatch.request.AddApplicationRequest;
import com.lingchen.cvMatch.request.UpdateApplicationRequest;
import com.lingchen.cvMatch.response.ApiResponse;
import com.lingchen.cvMatch.response.ApplicationResponse;
import com.lingchen.cvMatch.service.application.IApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}")
public class ApplicationController {

    private final IApplicationService applicationService;


    @GetMapping("/users/{userId}/applications")
    public ResponseEntity<ApiResponse> getUserApplications(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_APPLICATIONS_BY, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_DIR) String sortOrder
    ) {
        ApplicationResponse applicationResponse = applicationService.getApplicationsByUser(pageNumber, pageSize, sortBy, sortOrder);
        return ResponseEntity.ok(new ApiResponse("Get user applications successfully", applicationResponse));
    }

    @PostMapping("/applications")
    public ResponseEntity<ApiResponse> addApplication(@RequestBody AddApplicationRequest request) {
        Application application = applicationService.addApplication(request);
        ApplicationDto applicationDto = applicationService.convertToDto(application);
        return ResponseEntity.ok(new ApiResponse("Add application successfully", applicationDto));
    }

    @PutMapping("/applications/{id}")
    public ResponseEntity<ApiResponse> updateApplication(@PathVariable long id, @RequestBody UpdateApplicationRequest request) {
        Application application = applicationService.updateApplication(request, id);
        ApplicationDto applicationDto = applicationService.convertToDto(application);
        return ResponseEntity.ok(new ApiResponse("Update application successfully", applicationDto));
    }

    @DeleteMapping("/applications/{id}")
    public ResponseEntity<ApiResponse> deleteApplication(@PathVariable long id) {
        applicationService.deleteApplicationById(id);
        return ResponseEntity.ok(new ApiResponse("Delete application successfully", null));
    }
}
