package com.joy.parfaitReport.user.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class UserDao {
	
	private final SqlSessionTemplate sqlSession;
	
	public int countByEmail(Map<String, Object> param) {
		return sqlSession.selectOne("UserMapper.countByEmail", param);
	}
	
	public int insertUser(Map<String, Object> param) {
		return sqlSession.insert("UserMapper.insertUser", param);
	}
	
	public Map<String, Object> selectUserForLogin(Map<String, Object> param) {
	    return sqlSession.selectOne("UserMapper.selectUserForLogin", param);
	}	
}
