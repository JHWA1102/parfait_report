package com.joy.parfaitReport.common.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.joy.parfaitReport.common.service.CommonService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CommonCotroller {
	private final CommonService commonService;
	
	@GetMapping("/api/common/code")
    public List<Map<String, Object>> getCodeList(
            @RequestParam("mst_code") String mst_code) {

        return commonService.getCodeList(mst_code);
    }
}
