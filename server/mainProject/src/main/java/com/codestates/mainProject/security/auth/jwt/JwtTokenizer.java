package com.codestates.mainProject.security.auth.jwt;

import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenizer {
    @Getter
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    private final Map<String, Long> tokenBlackList = new HashMap<>();

    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // Access Token 생성 메서드
    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);


        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    // Refresh Token 생성 메서드 : Access Token이 만료되었을 경우, Access Token을 새로 생성하는 토큰

    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        String refreshToken = Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();

        return refreshToken;
    }

    // 검증 후, Claims을 반환하는 용도
    public Jws<Claims> getClaims(String jws) {


        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(jws);
        return claims;
    }


    // 단순히 검증만 하는 용도로 쓰일 경우
    public Jws<Claims> verifySignature(String jws) {

        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(jws);
        } catch (ExpiredJwtException exception) {
            throw new BusinessLogicException(ExceptionCode.JWT_TOKEN_EXPIRED);
        }
    }

    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

    public void addToTokenBlackList(String jws) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
        Long expirationTime = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jws)
                .getBody().get("refreshTokenExpirationMinutes", Long.class);

        tokenBlackList.put(jws, expirationTime);
    }

    private Key getKey() {
        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

        return getKeyFromBase64EncodedKey(base64EncodedSecretKey);
    }

}