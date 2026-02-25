package com.joy.parfaitReport.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joy.parfaitReport.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody Map<String, Object> param) {

        userService.signUp(param);

        return ResponseEntity.ok("회원가입 성공");
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> param) {

        String token = userService.login(param);

        Map<String, Object> result = new HashMap<>();
        result.put("accessToken", token);

        return ResponseEntity.ok(result);
    }    
}
