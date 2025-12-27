package com.hospital.utils;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.hospital.entity.AccountEntity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class JwtUtils {

    private final Key key;
    private final long expirationMs;

    public JwtUtils(@Value("${jwt.secret}") String secretKey,
                    @Value("${jwt.expirationMs}") long expirationMs) {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
        this.expirationMs = expirationMs;
    }

    /**
     * Sinh JWT token từ thông tin Account
     */
    public String generateToken(AccountEntity account) {
        return Jwts.builder()
                .setSubject(String.valueOf(account.getId())) // Lưu ID vào subject
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key)
                .compact();
    }
    /**
     * Validate JWT token
     */
    public Claims validateToken(String token) throws JwtException {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
        } catch (JwtException e) {
            throw e;
        }
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Lấy ID từ token
     */
    public Integer getIdFromToken(String token) {
        try {
            Claims claims = validateToken(token);
            return Integer.valueOf(claims.getSubject());
        } catch ( IllegalArgumentException e) {
            throw e;
        }catch(JwtException e){
            return null;
        }
    }
    /**
     * Kiểm tra token đã hết hạn chưa
     */
    public boolean isTokenExpired(String token) {
        try {
            Date expiration = validateToken(token).getExpiration();
            return expiration.before(new Date());
        } catch (JwtException e) {
            return true;
        }
    }
    /**
     * Kiểm tra token hợp lệ và chưa hết hạn
     */
    public boolean isTokenValid(String token) {
        return !isTokenExpired(token) && getIdFromToken(token) != null;
    }

    // lấy ra jwt token từ request
    public String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }
}
