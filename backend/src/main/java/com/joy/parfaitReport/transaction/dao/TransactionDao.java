package com.joy.parfaitReport.transaction.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TransactionDao {

    private final SqlSessionTemplate sqlSession;

    public int insertTransaction(Map<String, Object> param) {
        return sqlSession.insert("TransactionMapper.insertTransaction", param);
    }
}
