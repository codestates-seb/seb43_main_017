package com.codestates.mainProject.security.auth.filter;



import com.codestates.mainProject.security.auth.dto.TokenPrincipalDto;
import com.codestates.mainProject.security.auth.jwt.JwtTokenizer;
import com.codestates.mainProject.security.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;


    public JwtVerificationFilter(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    // 만약 request에 전달받은 authorization이 없으면 해당 필터는 실행안함
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    // request 객체로 claims 객체 꺼내는 메서드

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        Map<String, Object> claims = jwtTokenizer.getClaims(jws).getBody();

        return claims;
    }

    // SecurityContext에 저장하는 부분

    private void setAuthenticationToContext(Map<String, Object> claims) {

        String email = (String) claims.get("sub");
        Long id = Long.valueOf((Integer) claims.get("memberId"));
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List<String>)claims.get("roles"));


        Authentication authentication = new UsernamePasswordAuthenticationToken(new TokenPrincipalDto(id, email), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}