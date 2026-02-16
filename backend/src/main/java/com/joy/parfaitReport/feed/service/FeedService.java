package com.joy.parfaitReport.feed.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.joy.parfaitReport.feed.dao.FeedDao;
import com.joy.parfaitReport.util.AESUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedService {

    private final FeedDao feedDao;
    private final AESUtil aesUtil;   // 🔐 추가

    // 조회
    public List<Map<String, Object>> getFeedList(Map<String, Object> param) {

        List<Map<String, Object>> result = feedDao.getFeedList(param);

        if (result == null || result.isEmpty()) {
            throw new RuntimeException("번호 또는 비밀번호가 틀렸습니다.");
        }

        // 🔓 복호화 처리
        for (Map<String, Object> feed : result) {
            Object contentObj = feed.get("CONTENT");

            if (contentObj != null) {
                String encrypted = contentObj.toString();
                String decrypted = aesUtil.decrypt(encrypted);
                feed.put("CONTENT", decrypted);
            }
        }

        return result;
    }

    // 등록
    public void registFeed(Map<String, Object> param) {

        Object contentObj = param.get("content");

        if (contentObj != null) {
            String plainText = contentObj.toString();
            String encrypted = aesUtil.encrypt(plainText);

            // 🔐 암호화 후 저장
            param.put("content", encrypted);
        }

        int result = feedDao.registFeed(param);

        if (result != 1) {
            throw new RuntimeException("등록 실패");
        }
    }
}
