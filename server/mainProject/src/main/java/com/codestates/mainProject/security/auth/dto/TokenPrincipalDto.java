package com.codestates.mainProject.security.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TokenPrincipalDto {
    private long id;
    private String email;
}