DROP DATABASE IF EXISTS hospital;
CREATE DATABASE hospital;
USE hospital;

-- ============================================
-- Department
-- ============================================
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    head_doctor_id INT,
    phone VARCHAR(30),
    description TEXT,
    last_update DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- Doctor
-- ============================================
CREATE TABLE doctor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    gender ENUM('MALE','FEMALE','OTHER'),
    specialization VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    department_id INT NOT NULL,
    email VARCHAR(200),
    phone VARCHAR(30),
    bio TEXT,
    picture_url VARCHAR(500),
    last_update DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_doctor_department FOREIGN KEY (department_id) REFERENCES department(id)
);

-- ============================================
-- Patient
-- ============================================
CREATE TABLE patient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    identity_number BIGINT NOT NULL,
    gender ENUM('MALE','FEMALE','OTHER'),
    date_of_birth DATE,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(200),
    insurance_number VARCHAR(50),
    address VARCHAR(100),
    emergency_contact_name VARCHAR(50),
    emergency_contact_phone VARCHAR(30),
    last_update DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- Doctor Day Slot
-- ============================================
CREATE TABLE doctor_day_slot (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT NOT NULL,
    start_utc DATETIME NOT NULL,
    end_utc DATETIME NOT NULL,
    CHECK (start_utc < end_utc),
    UNIQUE KEY uq_doc_slot (doctor_id, start_utc),
    last_update DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_slot_doctor FOREIGN KEY (doctor_id) REFERENCES doctor(id)
);

-- ============================================
-- Appointment
-- ============================================
CREATE TABLE appointment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slot_id BIGINT NOT NULL,
    appointment_code VARCHAR(20) UNIQUE,
    doctor_id INT NOT NULL,
    patient_id INT NOT NULL,
    department_id INT NOT NULL,
    time DATETIME,
    status ENUM('PENDING','CONFIRMED','CANCELLED','COMPLETED') 
        NOT NULL DEFAULT 'PENDING',
    notes NVARCHAR(500),
    last_update DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_appt_slot (slot_id),
    CONSTRAINT fk_appt_slot FOREIGN KEY (slot_id) REFERENCES doctor_day_slot(id),
    CONSTRAINT fk_appt_doctor FOREIGN KEY (doctor_id) REFERENCES doctor(id),
    CONSTRAINT fk_appt_patient FOREIGN KEY (patient_id) REFERENCES patient(id),
    CONSTRAINT fk_appt_department FOREIGN KEY (department_id) REFERENCES department(id)
);

-- ============================================
-- ✅ Sample Data
-- ============================================

-- Department
INSERT INTO department (name, head_doctor_id, phone, description)
VALUES
('Khoa Nội', 1, '0123456789', 'Chuyên điều trị các bệnh nội tổng quát'),
('Khoa Ngoại', 2, '0987654321', 'Phẫu thuật và chăm sóc hậu phẫu'),
('Khoa Nhi', 3, '0905123456', 'Khám và điều trị cho trẻ em'),
('Khoa Tim mạch', 4, '0912345678', 'Chẩn đoán và điều trị bệnh tim'),
('Khoa Da liễu', 5, '0933221100', 'Chăm sóc và điều trị các bệnh về da');

-- Doctor
INSERT INTO doctor (full_name, gender, specialization, date_of_birth, department_id, email, phone, bio)
VALUES
('Nguyen Van A', 'MALE', 'Nội tổng quát', '1980-02-15', 1, 'a@hospital.com', '0901000001', 'BSCKII chuyên Nội tổng quát.'),
('Tran Thi B', 'FEMALE', 'Nội tiêu hóa', '1985-04-22', 1, 'b@hospital.com', '0901000002', 'ThS chuyên Nội tiêu hóa.'),
('Le Van C', 'MALE', 'Nội thần kinh', '1978-09-10', 1, 'c@hospital.com', '0901000003', 'BS chuyên Nội thần kinh.'),
('Pham Thi D', 'FEMALE', 'Nội tiết', '1983-01-05', 1, 'd@hospital.com', '0901000004', 'ThS Nội tiết.'),
('Nguyen Van E', 'MALE', 'Phẫu thuật tổng quát', '1975-06-12', 2, 'e@hospital.com', '0902000001', 'BSCKII Ngoại tổng quát.'),
('Tran Thi F', 'FEMALE', 'Phẫu thuật tiêu hóa', '1986-11-21', 2, 'f@hospital.com', '0902000002', 'ThS Ngoại tiêu hóa.'),
('Le Van G', 'MALE', 'Ngoại thần kinh', '1977-03-14', 2, 'g@hospital.com', '0902000003', 'BS Ngoại thần kinh.'),
('Pham Thi H', 'FEMALE', 'Chấn thương chỉnh hình', '1989-08-01', 2, 'h@hospital.com', '0902000004', 'BS chỉnh hình.'),
('Nguyen Van I', 'MALE', 'Nhi tổng quát', '1982-05-18', 3, 'i@hospital.com', '0903000001', 'BS Nhi tổng quát.'),
('Tran Thi K', 'FEMALE', 'Nhi sơ sinh', '1984-02-11', 3, 'k@hospital.com', '0903000002', 'BS Nhi sơ sinh.'),
('Le Van L', 'MALE', 'Tim mạch nội', '1979-07-09', 4, 'l@hospital.com', '0904000001', 'BS Tim mạch nội.'),
('Pham Thi M', 'FEMALE', 'Tim mạch can thiệp', '1987-03-25', 4, 'm@hospital.com', '0904000002', 'BS Tim mạch can thiệp.'),
('Nguyen Van N', 'MALE', 'Da liễu tổng quát', '1981-09-30', 5, 'n@hospital.com', '0905000001', 'BS Da liễu tổng quát.'),
('Tran Thi O', 'FEMALE', 'Da liễu thẩm mỹ', '1988-04-17', 5, 'o@hospital.com', '0905000002', 'BS thẩm mỹ da.'),
('Le Van P', 'MALE', 'Da liễu dị ứng', '1983-12-05', 5, 'p@hospital.com', '0905000003', 'BS dị ứng da.');

-- Patient
INSERT INTO patient (full_name, identity_number, gender, date_of_birth, phone, email, address)
VALUES
('Nguyen Anh', 123456789001, 'MALE', '1990-02-20', '0916000001', 'anh@gmail.com', 'Ha Noi'),
('Tran Binh', 123456789002, 'MALE', '1985-05-10', '0916000002', 'binh@gmail.com', 'Hai Phong'),
('Le Chi', 123456789003, 'FEMALE', '1992-03-14', '0916000003', 'chi@gmail.com', 'Nam Dinh'),
('Pham Duong', 123456789004, 'MALE', '2000-07-09', '0916000004', 'duong@gmail.com', 'Thai Binh'),
('Hoang Giang', 123456789005, 'FEMALE', '1998-11-01', '0916000005', 'giang@gmail.com', 'Ha Noi');

-- Doctor Day Slot
INSERT INTO doctor_day_slot (doctor_id, start_utc, end_utc)
VALUES
(1, '2025-11-01 08:00:00', '2025-11-01 09:00:00'),
(2, '2025-11-01 09:00:00', '2025-11-01 10:00:00'),
(3, '2025-11-01 10:00:00', '2025-11-01 11:00:00'),
(4, '2025-11-01 11:00:00', '2025-11-01 12:00:00'),
(5, '2025-11-01 08:00:00', '2025-11-01 09:00:00');

-- Appointment
INSERT INTO appointment (slot_id, appointment_code, doctor_id, patient_id, department_id, time, status, notes)
VALUES
(1, 'ENHD1937', 1, 1, 1, '2025-11-01 08:00:00', 'CONFIRMED', 'Khám định kỳ'),
(2, 'ENHD1938', 2, 2, 1, '2025-11-01 09:00:00', 'PENDING', 'Khám tiêu hóa'),
(3, 'ENHD1939', 3, 3, 1, '2025-11-01 10:00:00', 'CONFIRMED', 'Kiểm tra thần kinh'),
(4, 'ENHD1940', 4, 4, 1, '2025-11-01 11:00:00', 'CANCELLED', 'Đã hủy bởi bệnh nhân'),
(5, 'ENHD1941', 5, 5, 2, '2025-11-01 08:00:00', 'COMPLETED', 'Khám hậu phẫu');
