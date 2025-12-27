package com.hospital.config;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtAuthTokenFilter jwtAuthTokenFilter;


    // 🔥 BẬT CORS TOÀN CỤC — CHO PHÉP ORIGIN NULL (file://)
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*", "null")   // Quan trọng nhất để chạy từ file://
                        .allowedMethods("*")
                        .allowedHeaders("*")
                        .allowCredentials(false);
            }
        };
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())

            // 🔥 BẬT CORS BÊN TRONG SPRING SECURITY (nếu không → vẫn lỗi!)
            .cors(cors -> {})  

            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll()
                // .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll() 
                // .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()   
                // .requestMatchers(HttpMethod.GET, "/api/**").permitAll()  
                // .requestMatchers(HttpMethod.GET,"/uploads/**").permitAll()          
                // .anyRequest().authenticated()                                      
            );

        http.addFilterBefore(jwtAuthTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }


    @Bean
    public ApplicationRunner printFilters(SecurityFilterChain filterChain) {
        return args -> {
            System.out.println("===== SECURITY FILTERS TRONG SPRING SECURITY =====");
            filterChain.getFilters().forEach(f -> {
                System.out.println(f.getClass().getName());
            });
            System.out.println("==================================================");
        };
    }

}
