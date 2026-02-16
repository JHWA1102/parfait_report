package com.joy.parfaitReport.feed.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class FeedDao {
	
    private final SqlSessionTemplate sqlSession;
    
    public List<Map<String, Object>> getFeedList(Map<String, Object> param) {
        return sqlSession.selectList("FeedMapper.getFeedList", param);
    }    

    public int registFeed(Map<String, Object> param) {
        return sqlSession.insert("FeedMapper.registFeed", param);
    }
}
