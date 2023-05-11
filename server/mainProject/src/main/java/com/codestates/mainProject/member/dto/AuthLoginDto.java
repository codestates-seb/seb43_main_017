package com.codestates.mainProject.member.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthLoginDto {

    @NotNull
    @Email
    private String email;
    @NotNull
    @Size(min = 2, max = 20)
    private String name;

}