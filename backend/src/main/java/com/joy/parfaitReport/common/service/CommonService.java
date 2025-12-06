package com.joy.parfaitReport.common.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.joy.parfaitReport.common.dao.CommonDao;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommonService {

    private final CommonDao commonDao;

    public List<Map<String, Object>> getCodeList(String mst_code) {
        return commonDao.getCodeList(mst_code);
    }
}
