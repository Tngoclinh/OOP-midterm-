-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: hospital
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'duc anh','12312'),(2,'ducanh','12312'),(3,'admin','123');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctor_id` int NOT NULL,
  `patient_identity_number` bigint NOT NULL,
  `department_id` int DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `status` enum('PENDING','CONFIRMED','CANCELLED','COMPLETED') NOT NULL DEFAULT 'PENDING',
  `notes` varchar(500) DEFAULT NULL,
  `last_update` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_appt_doctor` (`doctor_id`),
  KEY `fk_appt_patient` (`patient_identity_number`),
  KEY `fk_appt_department` (`department_id`),
  CONSTRAINT `fk_appt_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  CONSTRAINT `fk_appt_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`id`),
  CONSTRAINT `fk_appt_patient` FOREIGN KEY (`patient_identity_number`) REFERENCES `patient` (`identity_number`),
  CONSTRAINT `chk_rating_only_completed` CHECK (((`rating` is null) or (`status` = _utf8mb4'COMPLETED'))),
  CONSTRAINT `chk_rating_point` CHECK (((`rating` is null) or (`rating` between 1 and 5)))
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,1,123456789001,3,5,'2025-11-10 08:00:00','COMPLETED','Khám tốt, bác sĩ tận tình','2025-12-27 08:36:04'),(2,2,123456789002,4,4,'2025-11-10 09:00:00','COMPLETED','Phẫu thuật thành công','2025-12-27 08:36:04'),(3,3,123456789003,5,3,'2025-11-10 10:00:00','COMPLETED','Điều trị tạm được','2025-12-27 08:36:04'),(4,4,123456789004,4,2,'2025-11-10 11:00:00','COMPLETED','Cần theo dõi thêm','2025-12-27 08:36:04'),(5,5,123456789005,3,1,'2025-11-11 08:30:00','COMPLETED','Nghỉ việc đi','2025-12-27 08:36:04'),(6,6,123456789001,2,5,'2025-11-11 09:30:00','COMPLETED','Xử lý ca cấp cứu tốt','2025-12-27 08:36:04'),(7,7,123456789002,1,4,'2025-11-11 10:30:00','COMPLETED','Giải thích rõ ràng','2025-12-27 08:36:04'),(8,8,123456789003,2,5,'2025-11-11 11:30:00','COMPLETED','Chẩn đoán chính xác','2025-12-27 08:36:04'),(9,9,123456789004,2,4,'2025-11-12 08:00:00','COMPLETED','Phẫu thuật thành công','2025-12-27 08:36:04'),(10,10,123456789005,1,5,'2025-11-12 09:00:00','COMPLETED','Điều trị hiệu quả','2025-12-27 08:36:04'),(11,1,123456789002,3,4,'2025-11-12 10:00:00','COMPLETED','Khám kỹ lưỡng','2025-12-27 08:36:04'),(12,2,123456789003,4,5,'2025-11-12 11:00:00','COMPLETED','Rất hài lòng','2025-12-27 08:36:04'),(13,3,123456789004,5,3,'2025-11-13 08:30:00','COMPLETED','Cần cải thiện thời gian chờ','2025-12-27 08:36:04'),(14,4,123456789005,4,1,'2025-11-13 09:30:00','COMPLETED','Chuyên môn yếu kém','2025-12-27 08:36:04'),(15,5,123456789001,3,5,'2025-11-13 10:30:00','COMPLETED','Rất chuyên nghiệp','2025-12-27 08:36:04'),(16,6,123456789002,2,NULL,'2025-11-14 08:00:00','PENDING','Chờ xác nhận','2025-12-27 08:36:04'),(17,7,123456789003,1,NULL,'2025-11-14 09:00:00','CONFIRMED','Đã xác nhận lịch','2025-12-27 08:36:04'),(18,8,123456789004,2,NULL,'2025-11-14 10:00:00','CONFIRMED','Chuẩn bị khám','2025-12-27 08:36:04'),(19,9,123456789005,2,NULL,'2025-11-14 11:00:00','CANCELLED','Bệnh nhân huỷ lịch','2025-12-27 08:36:04'),(20,10,123456789001,1,NULL,'2025-11-15 08:30:00','PENDING','Đặt lịch lần đầu','2025-12-27 08:36:04');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `head_doctor_id` int DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `description` text,
  `last_update` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Khoa Nội',NULL,'0123456789','Chuyên điều trị các bệnh nội tổng quát','2025-11-02 08:11:17'),(2,'Khoa Ngoại',NULL,'0987654321','Phẫu thuật và chăm sóc hậu phẫu','2025-11-02 08:11:17'),(3,'Khoa Nhi',NULL,'0905123456','Khám và điều trị cho trẻ em','2025-11-02 08:11:17'),(4,'Khoa Tim mạch',NULL,'0912345678','Chẩn đoán và điều trị bệnh tim','2025-11-02 08:11:17'),(5,'Khoa Da liễu',NULL,'0933221100','Chăm sóc và điều trị các bệnh về da','2025-11-02 08:11:17');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(50) NOT NULL,
  `gender` enum('MALE','FEMALE','OTHER') DEFAULT NULL,
  `specialization` varchar(50) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `department_id` int NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `bio` text,
  `experience_year` int DEFAULT NULL,
  `picture_id` int DEFAULT NULL,
  `last_update` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_doctor_department` (`department_id`),
  KEY `fk_doctor_picture` (`picture_id`),
  CONSTRAINT `fk_doctor_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  CONSTRAINT `fk_doctor_picture` FOREIGN KEY (`picture_id`) REFERENCES `picture` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,'Lê Thị F','FEMALE','Ngoại nhi','1988-11-20',3,'f.le@hospital.com','0902000006','Thạc sĩ chuyên khoa Ngoại nhi',12,6,'2025-12-27 08:36:04'),(2,'Hoàng Văn G','MALE','Phẫu thuật tim','1982-05-14',4,'g.hoang@hospital.com','0902000007','BSCKII Phẫu thuật tim mạch',18,7,'2025-12-27 08:36:04'),(3,'Ngô Thị H','FEMALE','Da liễu thẩm mỹ','1990-01-30',5,'h.ngo@hospital.com','0902000008','Chuyên gia điều trị da liễu',8,1,'2025-12-27 08:36:04'),(4,'Vũ Văn I','MALE','Nội tim mạch','1979-07-12',4,'i.vu@hospital.com','0902000009','BSCKI Nội tim mạch',22,8,'2025-12-27 08:36:04'),(5,'Đặng Thị K','FEMALE','Nhi tổng quát','1992-03-25',3,'k.dang@hospital.com','0902000010','Bác sĩ trẻ năng động, yêu trẻ em',5,2,'2025-12-27 08:36:04'),(6,'Bùi Văn L','MALE','Hồi sức cấp cứu','1984-09-05',2,'l.bui@hospital.com','0902000011','Kinh nghiệm xử lý ca khó',14,9,'2025-12-27 08:36:04'),(7,'Trần Văn M','MALE','Nội tiết','1981-12-15',1,'m.tran@hospital.com','0902000012','Chuyên gia về bệnh tiểu đường',16,10,'2025-12-27 08:36:04'),(8,'Phạm Thị N','FEMALE','Chẩn đoán hình ảnh','1987-06-18',2,'n.pham@hospital.com','0902000013','Bác sĩ chẩn đoán hình ảnh',11,3,'2025-12-27 08:36:04'),(9,'Lý Văn O','MALE','Ngoại thần kinh','1976-02-28',2,'o.ly@hospital.com','0902000014','Bàn tay vàng trong phẫu thuật',25,11,'2025-12-27 08:36:04'),(10,'Đỗ Thị P','FEMALE','Nội tiêu hóa','1993-10-10',1,'p.do@hospital.com','0902000015','Chuyên khoa nội soi tiêu hóa',4,4,'2025-12-27 08:36:04');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_news`
--

DROP TABLE IF EXISTS `medical_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `last_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_news`
--

LOCK TABLES `medical_news` WRITE;
/*!40000 ALTER TABLE `medical_news` DISABLE KEYS */;
INSERT INTO `medical_news` VALUES (1,'Bộ Y tế xây dựng gói dịch vụ y tế cơ bản thuộc phạm vi miễn viện phí','Chủ trương tiến tới miễn viện phí nằm trong yêu cầu khách quan, thể hiện bản chất tốt đẹp của chính sách xã hội Việt Nam. Bộ Y tế đang xây dựng gói dịch vụ y tế cơ bản để bảo đảm quyền được chăm sóc sức khỏe của người dân.\n\nGói cơ bản dự kiến gồm các dịch vụ thiết yếu, giúp giảm gánh nặng chi phí cho người bệnh, tăng tiếp cận và nâng cao chất lượng chăm sóc.\n\nĐịnh hướng là ưu tiên các can thiệp dự phòng, khám chữa bệnh ban đầu, tiêm chủng, chăm sóc bà mẹ và trẻ em, quản lý bệnh mạn tính phổ biến… để mọi người dân được thụ hưởng bình đẳng.\n\nCác địa phương sẽ được hướng dẫn tính toán chi phí, cấu phần dịch vụ, cơ chế thanh toán và lộ trình triển khai phù hợp với điều kiện nguồn lực, bảo đảm tính bền vững của quỹ.\n\nMở rộng bao phủ dịch vụ y tế cơ bản đến mọi nhóm dân cư.\nGiảm chi tiêu tiền túi, hạn chế nghèo hóa do chi phí y tế.\nChuẩn hóa gói dịch vụ và cơ chế chi trả để đảm bảo chất lượng.','2025-12-01 00:00:00'),(2,'WHO khuyến nghị Việt Nam mạnh tay với thuốc lá điện tử','Đại diện WHO tại Việt Nam đề xuất cần một chiến dịch ra quân quyết liệt để kiểm soát thuốc lá điện tử, tương tự quy định cấm nồng độ cồn khi lái xe.\n\nViệc siết chặt quản lý nhằm bảo vệ sức khỏe cộng đồng, nhất là giới trẻ, trước nguy cơ nghiện nicotine và tác hại lâu dài.\n\nWHO khuyến nghị hoàn thiện khung pháp lý, tăng kiểm tra thị trường, quản lý quảng cáo và buôn lậu, đồng thời đẩy mạnh truyền thông nguy cơ tới học sinh, sinh viên.\n\nCác chuyên gia cũng nhấn mạnh cần hỗ trợ cai nghiện, tư vấn tâm lý, và tích hợp giám sát vào hệ thống phòng chống tác hại thuốc lá hiện có.\n\nTăng thuế và chế tài với sản phẩm thuốc lá điện tử.\nCấm quảng cáo, khuyến mại nhắm tới thanh thiếu niên.\nXây dựng điểm tư vấn, hỗ trợ cai nghiện nicotine.','2025-12-01 00:00:00'),(3,'Hiện thực hóa hành động kiểm soát sốt xuất huyết','Hội nghị khoa học toàn quốc về sốt xuất huyết Dengue 2025 nhấn mạnh các hành động toàn diện trong kiểm soát dịch, từ giám sát, truyền thông, đến phối hợp liên ngành.\n\nCác đại biểu chia sẻ kinh nghiệm và giải pháp để giảm ca mắc, hạn chế tử vong và chuẩn bị nguồn lực ứng phó bền vững.\n\nTrong mùa cao điểm, ngành y tế khuyến cáo người dân loại bỏ ổ bọ gậy, ngủ màn, dùng thuốc xua muỗi, đồng thời sớm đến cơ sở y tế khi có dấu hiệu cảnh báo.\n\nCác địa phương tăng cường phun diệt muỗi trọng điểm, cập nhật phác đồ điều trị, dự trữ dịch truyền và nhân lực hồi sức cho ca nặng.\n\nGiám sát chủ động ca bệnh và ổ dịch tại cộng đồng.\nTruyền thông thay đổi hành vi phòng bệnh sốt xuất huyết.\nBảo đảm vật tư, dịch truyền, nhân lực hồi sức trong cao điểm.','2024-01-03 00:00:00'),(4,'Siết chất lượng đào tạo ngành y, chuẩn hóa thực hành','Chuyên gia cho rằng để bảo đảm an toàn người bệnh, đào tạo bác sĩ cần chuẩn hóa theo mô hình nội trú và siết điều kiện mở ngành y, đồng thời tăng cường thực hành chuẩn.\n\nĐề xuất này nhằm nâng cao chất lượng nhân lực y tế, đáp ứng yêu cầu ngày càng cao của hệ thống chăm sóc sức khỏe.\n\nViệc chuẩn hóa bao gồm chuẩn đầu ra, thời lượng thực hành lâm sàng, giám sát chất lượng và cấp chứng chỉ hành nghề sau khi hoàn thành thực tập bắt buộc.\n\nCác trường cần liên kết bệnh viện để tăng thời gian tại buồng bệnh, cập nhật tiến bộ y khoa, đạo đức nghề nghiệp và kỹ năng giao tiếp với người bệnh.\n\nChuẩn đầu ra thống nhất, sát thực tiễn.\nThực hành lâm sàng đủ thời lượng, có giám sát.\nĐánh giá độc lập trước cấp chứng chỉ hành nghề.','2023-06-07 00:00:00'),(5,'Diễn tập ứng phó bảo đảm an toàn bức xạ trong y tế','Bệnh viện K tổ chức diễn tập kịch bản sự cố bức xạ, đánh giá năng lực ứng phó và bảo vệ an toàn cho nhân viên, bệnh nhân trong tình huống khẩn cấp.\n\nHoạt động giúp củng cố quy trình, nâng cao kỹ năng và phối hợp liên ngành trong quản lý rủi ro bức xạ.\n\nCác đội phản ứng được luyện tập quy trình báo động đỏ, khoanh vùng, đánh giá nhiễm xạ, khử nhiễm, vận chuyển an toàn và chăm sóc người nghi phơi nhiễm.\n\nKết quả diễn tập là cơ sở để cập nhật kế hoạch ứng phó khẩn cấp, bổ sung trang thiết bị bảo hộ, thiết bị đo và đào tạo định kỳ.\n\nChuẩn hóa quy trình báo động, khoanh vùng và khử nhiễm.\nĐào tạo liên tục cho đội phản ứng nhanh và nhân viên liên quan.\nBổ sung phương tiện đo xạ, bảo hộ, vận chuyển an toàn.','2020-11-17 00:00:00'),(6,'Ngày Thế giới phòng, chống AIDS: cảnh báo trẻ hóa và lây nhiễm âm thầm','Nhiều địa phương ghi nhận chuyển biến tích cực trong phòng chống HIV/AIDS nhưng vẫn đối mặt với thách thức trẻ hóa ca mắc và nguy cơ lây nhiễm âm thầm.\n\nCần tăng truyền thông, nguồn lực và dịch vụ thân thiện để giảm kỳ thị, mở rộng xét nghiệm và điều trị sớm.\n\nNgành y tế khuyến khích xét nghiệm định kỳ cho nhóm nguy cơ, điều trị ARV sớm và liên kết chăm sóc với cộng đồng để duy trì tuân thủ.\n\nĐồng thời, nâng cao dịch vụ dự phòng trước phơi nhiễm (PrEP), phát bao cao su, bơm kim sạch, và tư vấn tâm lý để giảm lây truyền.\n\nMở rộng xét nghiệm tiếp cận cộng đồng, giảm kỳ thị.\nTăng bao phủ điều trị ARV và hỗ trợ tuân thủ.\nĐẩy mạnh PrEP, can thiệp giảm hại cho nhóm nguy cơ cao.','2019-05-17 00:00:00'),(7,'70% dịch bệnh bắt nguồn từ động vật: đề nghị củng cố tuyến thú y công cộng','Đại biểu Quốc hội nhấn mạnh cần hoàn thiện pháp luật và củng cố năng lực tuyến thú y công cộng để ứng phó với dịch bệnh nguồn động vật, bảo vệ sức khỏe cộng đồng.\n\nKiểm soát dịch sớm, giám sát dịch tễ và phối hợp liên ngành là trọng tâm để giảm nguy cơ bùng phát.\n\nViệc tăng cường thú y cơ sở giúp phát hiện sớm, xử lý ổ dịch, tiêm phòng, kiểm soát vận chuyển và truy xuất nguồn gốc động vật.\n\nHệ thống giám sát liên thông giữa y tế, nông nghiệp và môi trường sẽ hỗ trợ cảnh báo sớm, bảo vệ sức khỏe con người trước bệnh truyền lây từ động vật.\n\nNâng năng lực thú y công cộng và thú y cơ sở.\nGiám sát dịch bệnh một sức khỏe, cảnh báo sớm.\nPhối hợp liên ngành kiểm soát vận chuyển, chăn nuôi an toàn.','2025-04-01 00:00:00');
/*!40000 ALTER TABLE `medical_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `identity_number` bigint NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `gender` enum('MALE','FEMALE','OTHER') DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `phone` varchar(30) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `insurance_number` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `emergency_contact_phone` varchar(30) DEFAULT NULL,
  `last_update` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`identity_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (123456789001,'Nguyen Anh','MALE','1990-02-20','0916000001','anh@gmail.com',NULL,'Ha Noi',NULL,'2025-11-02 08:11:17'),(123456789002,'Tran Binh','MALE','1985-05-10','0916000002','binh@gmail.com',NULL,'Hai Phong',NULL,'2025-11-02 08:11:17'),(123456789003,'Le Chi','FEMALE','1992-03-14','0916000003','chi@gmail.com',NULL,'Nam Dinh',NULL,'2025-11-02 08:11:17'),(123456789004,'Pham Duong','MALE','2000-07-09','0916000004','duong@gmail.com',NULL,'Thai Binh',NULL,'2025-11-02 08:11:17'),(123456789005,'Hoang Giang','FEMALE','1998-11-01','0916000005','giang@gmail.com',NULL,'Ha Noi',NULL,'2025-11-02 08:11:17');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `picture` (
  `id` int NOT NULL AUTO_INCREMENT,
  `picture_url` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
INSERT INTO `picture` VALUES (1,'doctor-female-1.png'),(2,'doctor-female-2.png'),(3,'doctor-female-3.png'),(4,'doctor-female-4.png'),(5,'doctor-female-5.png'),(6,'doctor-female-6.png'),(7,'doctor-female-7.png'),(8,'doctor-male-1.png'),(9,'doctor-male-2.png'),(10,'doctor-male-3.png'),(11,'doctor-male-4.png'),(12,'doctor-male-5.png'),(13,'doctor-male-6.png'),(14,'doctor-male-7.png'),(15,'hospital.png'),(16,'leader-deputy-1.jpg'),(17,'leader-deputy-2.jpg'),(18,'leader-director.jpg'),(19,'logo.png'),(20,'logoo.png'),(21,'volunteer.png');
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-27  8:41:23
