package  com.hospital.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.hospital.entity.DoctorDaySlot;
import com.hospital.repository.DoctorDaySlotRepository;

@Service
public class DoctorDaySlotService {

    private final DoctorDaySlotRepository repo;

    public DoctorDaySlotService(DoctorDaySlotRepository repo) {
        this.repo = repo;
    }

    public List<DoctorDaySlot> findAll() {
        return repo.findAll();
    }

    public Optional<DoctorDaySlot> findById(Long id) {
        return repo.findById(id);
    }

    public DoctorDaySlot save(DoctorDaySlot slot) {
        return repo.save(slot);
    }

    public DoctorDaySlot update(Long id, DoctorDaySlot slot) {
        slot.setId(id);
        return repo.save(slot);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }
}
