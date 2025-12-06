package com.joy.parfaitReport.config;

import javax.sql.DataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

@Configuration
public class MyBatisConfig {

	@Bean
	public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
	    SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
	    bean.setDataSource(dataSource);
	    bean.setMapperLocations(
	            new PathMatchingResourcePatternResolver()
	                    .getResources("classpath:/mapper/*.xml")
	    );

	    org.apache.ibatis.session.Configuration config =
	            new org.apache.ibatis.session.Configuration();
	    config.setMapUnderscoreToCamelCase(true);

	    bean.setConfiguration(config);
	    return bean.getObject();
	}

	@Bean
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
	    return new SqlSessionTemplate(sqlSessionFactory);
	}

}
