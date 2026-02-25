package com.joy.parfaitReport.transaction.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joy.parfaitReport.transaction.service.TransactionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/transaction")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Map<String, Object> param,
                                  Authentication authentication) {

        String userId = (String) authentication.getPrincipal();

        param.put("userId", Long.parseLong(userId));

        transactionService.saveTransaction(param);

        return ResponseEntity.ok("저장 완료");
    }
}