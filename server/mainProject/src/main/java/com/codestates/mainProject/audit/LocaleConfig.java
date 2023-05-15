package com.codestates.mainProject.audit;

import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@Configuration //스프링부트가 한번 돌면서 특정 어노테이션을 달고잇는 놈들을 빈으로 등록하는데, 이때 등록함
public class LocaleConfig { //LocalDateTime 자체를 서울로 지정함 (서버 시간을 굳이 바꿀 필요 X, Entity에 특정 처리할 필요 x)
    @PostConstruct
    public void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }
}