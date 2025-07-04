package com.lingchen.cvMatch.controller;

import com.lingchen.cvMatch.dto.StatusDto;
import com.lingchen.cvMatch.model.Status;
import com.lingchen.cvMatch.response.ApiResponse;
import com.lingchen.cvMatch.service.status.IStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}")
public class StatusController {

    private final IStatusService statusService;

    @GetMapping("/statuses")
    public ResponseEntity<ApiResponse> getAllStatuses() {
        List<StatusDto> statuses = statusService.getAllStatuses()
                .stream()
                .map(statusService::convertToDto)
                .toList();
        return ResponseEntity.ok(new ApiResponse("Add application successfully", statuses));

    }

}
