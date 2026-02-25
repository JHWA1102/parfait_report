package com.joy.parfaitReport.transaction.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.joy.parfaitReport.transaction.dao.TransactionDao;
import com.joy.parfaitReport.util.AESUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionDao transactionDao;
    private final AESUtil aesUtil;

    public void saveTransaction(Map<String, Object> param) {

        if (param.get("amount") == null) {
            throw new RuntimeException("금액은 필수입니다.");
        }

        // COMPANY 암호화
        if (param.get("company") != null) {
            String encryptedCompany =
                    aesUtil.encrypt((String) param.get("company"));
            param.put("company", encryptedCompany);
        }

        // MEMO 암호화
        if (param.get("memo") != null) {
            String encryptedMemo =
                    aesUtil.encrypt((String) param.get("memo"));
            param.put("memo", encryptedMemo);
        }

        transactionDao.insertTransaction(param);
    }
}
