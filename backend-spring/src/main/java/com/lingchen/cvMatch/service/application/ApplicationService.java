package com.lingchen.cvMatch.service.application;

import com.lingchen.cvMatch.dto.ApplicationDto;
import com.lingchen.cvMatch.exception.ResourceNotFoundException;
import com.lingchen.cvMatch.model.Application;
import com.lingchen.cvMatch.model.Status;
import com.lingchen.cvMatch.model.User;
import com.lingchen.cvMatch.repository.ApplicationRepository;
import com.lingchen.cvMatch.repository.StatusRepository;
import com.lingchen.cvMatch.repository.UserRepository;
import com.lingchen.cvMatch.request.AddApplicationRequest;
import com.lingchen.cvMatch.request.UpdateApplicationRequest;
import com.lingchen.cvMatch.response.ApplicationResponse;
import com.lingchen.cvMatch.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ApplicationService implements IApplicationService {

    private final ApplicationRepository applicationRepository;
    private final IUserService userService;
    private final UserRepository userRepository;
    private final StatusRepository statusRepository;
    private final ModelMapper modelMapper;

    @Override
    public ApplicationResponse getUserApplications(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        User user = userService.getAuthenticatedUser();

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Application> applicationPage = applicationRepository.findAllByUser(user, pageDetails);

        List<Application> applications = applicationPage.getContent();
        List<ApplicationDto> applicationDtos = applications.stream().map(this::convertToDto).toList();

        ApplicationResponse applicationResponse = new ApplicationResponse();
        applicationResponse.setContent(applicationDtos);
        applicationResponse.setPageNumber(applicationPage.getNumber());
        applicationResponse.setPageSize(applicationPage.getSize());
        applicationResponse.setTotalElements(applicationPage.getTotalElements());
        applicationResponse.setTotalPages(applicationPage.getTotalPages());
        applicationResponse.setLastPage(applicationPage.isLast());

        return applicationResponse;
    }


    @Override
    public ApplicationResponse getUserApplicationsByStatus(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String statusName) {
        User user = userService.getAuthenticatedUser();

        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<Application> applicationPage = applicationRepository.findAllByUserAndStatusName(user, statusName, pageDetails);

        List<Application> applications = applicationPage.getContent();
        List<ApplicationDto> applicationDtos = applications.stream().map(this::convertToDto).toList();

        ApplicationResponse applicationResponse = new ApplicationResponse();
        applicationResponse.setContent(applicationDtos);
        applicationResponse.setPageNumber(applicationPage.getNumber());
        applicationResponse.setPageSize(applicationPage.getSize());
        applicationResponse.setTotalElements(applicationPage.getTotalElements());
        applicationResponse.setTotalPages(applicationPage.getTotalPages());
        applicationResponse.setLastPage(applicationPage.isLast());

        return applicationResponse;
    }

    @Override
    public Application getApplicationById(long id) {
        return applicationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Application", "id", id));
    }

    @Override
    public Application addApplication(AddApplicationRequest request) {
        User user = userService.getAuthenticatedUser();
        Application application = new Application();
        application.setUser(user);

        application.setCompanyName(request.getCompanyName());
        application.setDateApplied(request.getDateApplied());
        application.setJobUrl(request.getJobUrl());
        application.setJobTitle(request.getJobTitle());
        application.setNotes(request.getNotes());

        Status status = statusRepository.getStatusByName(request.getStatusName())
                .orElseThrow(() -> new ResourceNotFoundException("Status", "name", request.getStatusName()));
        application.setStatus(status);

        return applicationRepository.save(application);
    }

    @Override
    public Application updateApplication(UpdateApplicationRequest request, Long id) {
        Application application = getApplicationById(id);

        User user = userService.getAuthenticatedUser();
        user.getApplications().stream().filter(app -> app.getId().equals(id)).findAny().orElseThrow(() -> new ResourceNotFoundException("Application", "id", id));

        application.setCompanyName(request.getCompanyName());
        application.setDateApplied(request.getDateApplied());
        application.setJobUrl(request.getJobUrl());
        application.setJobTitle(request.getJobTitle());
        application.setNotes(request.getNotes());

        Status status = statusRepository.getStatusByName(request.getStatusName())
                .orElseThrow(() -> new ResourceNotFoundException("Status", "name", request.getStatusName()));
        application.setStatus(status);

        Application updatedApplication = applicationRepository.save(application);

        user.getApplications().removeIf(app -> app.getId().equals(id));
        user.getApplications().add(updatedApplication);
        userRepository.save(user);

        return updatedApplication;
    }

    @Override
    public void deleteApplicationById(long id) {
        Application application = getApplicationById(id);

        User user = application.getUser();
        user.getApplications().removeIf(app -> app.getId().equals(id));
        userRepository.save(user);

        Status status = application.getStatus();

        applicationRepository.delete(application);

        if (applicationRepository.getApplicationsByStatus(status).isEmpty()) {
            statusRepository.delete(status);
        }
    }


    @Override
    public ApplicationDto convertToDto(Application application) {
        return modelMapper.map(application, ApplicationDto.class);
    }
}
