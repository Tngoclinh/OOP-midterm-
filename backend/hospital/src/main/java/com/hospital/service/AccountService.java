package com.hospital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.entity.AccountEntity;
import com.hospital.repository.AccountRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountService {

    @Autowired
    private AccountRepository repo;

    public List<AccountEntity> findAll() {
        return repo.findAll();
    }

    public Optional<AccountEntity> findById(Integer id) {
        if(id == null){
            throw new IllegalArgumentException("Account id must not be null");
        }
        return repo.findById(id);
    }

    public AccountEntity save(AccountEntity account) {
        if (account == null) {
            throw new IllegalArgumentException("Account must not be null");
        }
        return repo.save(account);
    }
    public AccountEntity update(AccountEntity account) {
        if (account == null) {
            throw new IllegalArgumentException("Appointment must not be null");
        }
        if (account.getUsername() == null) {
            throw new IllegalArgumentException("Appointment id must not be null");
        }

        if (!repo.existsById(account.getId())) {
            throw new EntityNotFoundException("Appointment not found with id=" + account.getId());
        }
        return repo.save(account);
    }

    public void deleteById(Integer id) {
         if (id == null) {
            throw new IllegalArgumentException("Account id must not be null");
        }
        if (!repo.existsById(id)) {
            throw new EntityNotFoundException("Account not found with id=" + id);
        }
        repo.deleteById(id);
    }

    public Optional<AccountEntity> findByUsername(String username) {
        return repo.findByUsername(username);
    }

    public AccountEntity changePassword(Integer id, String newPassword) {
        if (newPassword != null && newPassword.startsWith("\"") && newPassword.endsWith("\"")) {
            newPassword = newPassword.substring(1, newPassword.length() - 1);
        }
        if (id == null) {
            throw new IllegalArgumentException("Account id must not be null");
        }
        if (newPassword == null || newPassword.isBlank()) {
            throw new IllegalArgumentException("New password must not be blank");
        }

        AccountEntity account = repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Account not found with id=" + id));

        account.setPassword(newPassword);
        return repo.save(account);
    }
}
