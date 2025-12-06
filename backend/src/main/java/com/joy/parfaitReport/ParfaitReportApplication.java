package com.joy.parfaitReport;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.joy.parfaitReport")
public class ParfaitReportApplication {

	public static void main(String[] args) {
		SpringApplication.run(ParfaitReportApplication.class, args);
	}

}
