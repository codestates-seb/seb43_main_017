package com.codestates.mainProject.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class NaverUserInfo {
    private String email;
    private String name;
    // Getter, Setter, toString 등 생략 가능
}
