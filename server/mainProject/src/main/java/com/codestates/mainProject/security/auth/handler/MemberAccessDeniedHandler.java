package com.codestates.mainProject.security.auth.handler;


import com.codestates.mainProject.security.auth.utils.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class MemberAccessDeniedHandler implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException{
        ErrorResponder.sendErrorResponse(response, HttpStatus.FORBIDDEN);
        log.warn("Forbidden error happened: {}", accessDeniedException.getMessage());

        // DaoAuthenticationProvider
    }
}