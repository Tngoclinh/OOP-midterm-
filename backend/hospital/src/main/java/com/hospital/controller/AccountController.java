package com.hospital.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hospital.entity.AccountEntity;
import com.hospital.service.AccountService;

import lombok.RequiredArgsConstructor;


@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService service;

    @GetMapping
    public ResponseEntity<?> getAccounts(
            @RequestParam(required = false) Integer id,
            @RequestParam(required = false) String username) {

        // 1. Ưu tiên kiểm tra ID trước
        if (id != null) {
            return service.findById(id)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }

        // 2. Tiếp theo kiểm tra Username
        if (username != null && !username.isBlank()) {
            return service.findByUsername(username)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }

        // 3. Nếu cả hai đều null, trả về tất cả danh sách
        List<AccountEntity> accounts = service.findAll();
        return ResponseEntity.ok(accounts);
    }

    @PostMapping
    public AccountEntity create(@RequestBody AccountEntity account) {
        return service.save(account);
    }

    @PutMapping
    public ResponseEntity<AccountEntity> changePassword(
            @RequestParam Integer id,
            @RequestBody String newPassword) {
        return ResponseEntity.ok(service.changePassword(id, newPassword));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
        
    }
}