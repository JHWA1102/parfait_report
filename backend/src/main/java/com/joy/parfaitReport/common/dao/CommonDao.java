package com.joy.parfaitReport.common.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class CommonDao {

    private final SqlSessionTemplate sqlSession;

    public List<Map<String, Object>> getCodeList(String mst_code) {
        return sqlSession.selectList("CommonMapper.getCodeList", mst_code);
    }
}
