package com.joy.parfaitReport.feed.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joy.parfaitReport.feed.service.FeedService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feed")
public class FeedController {
	
	private final FeedService feedService;
	
	@PostMapping("/getFeedList")
	public ResponseEntity<List<Map<String, Object>>> getFeed(@RequestBody Map<String, Object> param) {

	    return ResponseEntity.ok(feedService.getFeedList(param));
	}	
	
	@PostMapping("/registFeed")
	public ResponseEntity<String> registFeed(@RequestBody Map<String, Object> param) {

	    feedService.registFeed(param);

	    return ResponseEntity.ok("success");
	}

}
