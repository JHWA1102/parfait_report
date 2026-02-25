package com.joy.parfaitReport.user.service;

import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.joy.parfaitReport.user.dao.UserDao;
import com.joy.parfaitReport.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void signUp(Map<String, Object> param) {

        // 1️. 이메일 중복 체크
        int count = userDao.countByEmail(param);
        if (count > 0) {
            throw new RuntimeException("이미 가입된 이메일입니다.");
        }

        // 2️. 비밀번호 암호화
        String rawPassword = (String) param.get("password");
        String encodedPassword = passwordEncoder.encode(rawPassword);

        param.put("password", encodedPassword);

        // 3️. 회원가입
        userDao.insertUser(param);
    }
    
    public String login(Map<String, Object> param) {

        // 1️. 사용자 조회
        Map<String, Object> user = userDao.selectUserForLogin(param);

        if (user == null) {
            throw new RuntimeException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        // 2️. 탈퇴 여부 체크
        if ("Y".equals(user.get("DEL_YN"))) {
            throw new RuntimeException("탈퇴한 계정입니다.");
        }

        // 3️. 비밀번호 비교
        String rawPassword = (String) param.get("password");
        String encodedPassword = (String) user.get("PASSWORD");

        if (!passwordEncoder.matches(rawPassword, encodedPassword)) {
            throw new RuntimeException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        // 4️. JWT 발급
        return jwtUtil.generateToken(user);
    }
    
}