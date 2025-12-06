package com.joy.parfaitReport.member;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MemberController {
	@PostMapping(value = "/login")
	public void login() {
		System.out.println("pass!");
	}
}
