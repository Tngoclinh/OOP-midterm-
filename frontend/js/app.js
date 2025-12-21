// JS/app.js
// ====== Data: danh sách bác sĩ ======
const doctors = [
  {id:1, name:'Nguyễn Lan Anh', gender:'Nữ', specialty:'Nhi khoa', exp:9, rating:4.8, tags:['Khám ngoài giờ','Tư vấn video'], avatar:'#c7d2fe', photo:'../assets/doctor-female-1.png'},
  {id:2, name:'Trần Quang Huy', gender:'Nam', specialty:'Tim mạch', exp:15, rating:4.9, tags:['Nhận bệnh mới'], avatar:'#b9fbc0', photo:'../assets/doctor-male-1.png'},
  {id:3, name:'Lê Minh Tuấn', gender:'Nam', specialty:'Chấn thương chỉnh hình', exp:12, rating:4.7, tags:['Tư vấn video'], avatar:'#ffd6a5', photo:'../assets/doctor-male-2.png'},
  {id:4, name:'Phạm Thùy Dương', gender:'Nữ', specialty:'Tai mũi họng', exp:7, rating:4.6, tags:[], avatar:'#f9c6d4', photo:'../assets/doctor-female-2.png'},
  {id:5, name:'Bùi Văn Nam', gender:'Nam', specialty:'Nội thần kinh', exp:18, rating:4.8, tags:['Khám ngoài giờ','Nhận bệnh mới'], avatar:'#ffd6a5', photo:'../assets/doctor-male-3.png'},
  {id:6, name:'Đặng Hồng Nhung', gender:'Nữ', specialty:'Sản phụ', exp:14, rating:4.9, tags:['Tư vấn video'], avatar:'#e9ff70', photo:'../assets/doctor-female-3.png'},
  {id:7, name:'Vũ Tiến Mạnh', gender:'Nam', specialty:'Răng hàm mặt', exp:10, rating:4.5, tags:['Khám ngoài giờ'], avatar:'#caffbf', photo:'../assets/doctor-male-4.png'},
  {id:8, name:'Hồ Phương Linh', gender:'Nữ', specialty:'Mắt', exp:6, rating:4.4, tags:['Nhận bệnh mới'], avatar:'#bdb2ff', photo:'../assets/doctor-female-4.png'},
  {id:9, name:'Đỗ Quốc Khánh', gender:'Nam', specialty:'Da liễu', exp:11, rating:4.6, tags:[], avatar:'#ffd6e7', photo:'../assets/doctor-male-5.png'},
  {id:10, name:'Tạ Thanh Bình', gender:'Nữ', specialty:'Nội tiết', exp:16, rating:4.7, tags:['Tư vấn video'], avatar:'#a7f3d0', photo:'../assets/doctor-female-5.png'},
  {id:11, name:'Nguyễn Quốc Anh', gender:'Nam', specialty:'Tiết niệu', exp:8, rating:4.5, tags:['Khám ngoài giờ'], avatar:'#fecaca', photo:'../assets/doctor-male-6.png'},
  {id:12, name:'Lương Hải Yến', gender:'Nữ', specialty:'Nhi khoa', exp:5, rating:4.3, tags:[], avatar:'#fde68a', photo:'../assets/doctor-female-6.png'},
  {id:13, name:'Phan Nhật Minh', gender:'Nam', specialty:'Tim mạch', exp:20, rating:4.9, tags:['Tư vấn video','Khám ngoài giờ'], avatar:'#bae6fd', photo:'../assets/doctor-male-7.png'},
  {id:14, name:'Đinh Thu Trang', gender:'Nữ', specialty:'Da liễu', exp:9, rating:4.6, tags:['Nhận bệnh mới'], avatar:'#f5d0fe', photo:'../assets/doctor-female-7.png'},
];

document.addEventListener("DOMContentLoaded", () => {
  // ==== Đổi active cho menu ====
  const navItems = document.querySelectorAll("nav li");

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // ==== Chat widget ====
  const chatBtn = document.querySelector(".chat-btn");
  const chatWidget = document.getElementById("chatWidget");
  const chatCloseBtn = document.getElementById("chatCloseBtn");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatBody = document.getElementById("chatBody");

  // Mở / đóng khi click icon chat
  if (chatBtn && chatWidget) {
    chatBtn.addEventListener("click", () => {
      chatWidget.classList.toggle("open");

      if (chatWidget.classList.contains("open") && chatInput) {
        // focus vào ô nhập
        setTimeout(() => chatInput.focus(), 50);
      }
    });
  }

  // Nút đóng trên header chat
  if (chatCloseBtn && chatWidget) {
    chatCloseBtn.addEventListener("click", () => {
      chatWidget.classList.remove("open");
    });
  }

  // Đóng khi nhấn phím ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatWidget) {
      chatWidget.classList.remove("open");
    }
  });

  // Gửi tin nhắn (enter hoặc nút gửi)
  if (chatForm && chatInput && chatBody) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      // Tạo bubble tin nhắn của người dùng
      const row = document.createElement("div");
      row.className = "chat-message-row user";

      const bubble = document.createElement("div");
      bubble.className = "chat-message-bubble user";
      bubble.textContent = text;

      row.appendChild(bubble);
      chatBody.appendChild(row);

      // Scroll xuống cuối
      chatBody.scrollTop = chatBody.scrollHeight;

      // Clear ô nhập
      chatInput.value = "";
    });
  }
});
// ========== Chat widget ==========
function initChatWidget() {
  const chatWidget = document.getElementById('chatWidget');
  const chatBtn = document.querySelector('.chat-btn, .chat-fab'); // hỗ trợ cả 2 kiểu class
  const chatClose = document.getElementById('chatCloseBtn');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');

  // nếu không có chat-widget thì thôi
  if (!chatWidget || chatWidget.dataset.bound === 'true') return;

  // đánh dấu đã bind để gọi nhiều lần cũng không bị nhân đôi event
  chatWidget.dataset.bound = 'true';

  function openChat() {
    chatWidget.classList.add('open');
  }

  function closeChat() {
    chatWidget.classList.remove('open');
  }

  if (chatBtn) {
    chatBtn.addEventListener('click', () => {
      chatWidget.classList.toggle('open');
    });
  }

  if (chatClose) {
    chatClose.addEventListener('click', closeChat);
  }

  // Gửi tin nhắn đơn giản
  if (chatForm && chatInput && chatBody) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      // thêm tin nhắn của user
      const row = document.createElement('div');
      row.className = 'chat-message-row me';

      const bubble = document.createElement('div');
      bubble.className = 'chat-message-bubble me';
      bubble.textContent = text;

      row.appendChild(bubble);
      chatBody.appendChild(row);
      chatBody.scrollTop = chatBody.scrollHeight;

      chatInput.value = '';

      // trả lời auto sunshine
      setTimeout(() => {
        const botRow = document.createElement('div');
        botRow.className = 'chat-message-row';

        const avatar = document.createElement('div');
        avatar.className = 'chat-avatar';
        avatar.textContent = 'TV';

        const botBubble = document.createElement('div');
        botBubble.className = 'chat-message-bubble support';
        botBubble.textContent = 'Cảm ơn bạn! Tư vấn viên sẽ liên hệ lại trong thời gian sớm nhất.';

        botRow.appendChild(avatar);
        botRow.appendChild(botBubble);
        chatBody.appendChild(botRow);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 600);
    });
  }
}
document.addEventListener('DOMContentLoaded', initChatWidget);
// ====== Đội ngũ bác sĩ: render + filter ======
function initDoctorsPage() {
  const grid = document.getElementById('doctorsGrid');
  if (!grid) return; // không ở trang này thì thôi

  const countEl = document.getElementById('doctorCount');
  const emptyEl = document.getElementById('doctorsEmpty');
  const pagEl = document.getElementById('doctorsPagination');

  const searchInput = document.getElementById('doctorSearch');
  const genderSelect = document.getElementById('filterGender');
  const specSelect = document.getElementById('filterSpecialty');
  const tagVideo = document.getElementById('filterTagVideo');
  const tagOver = document.getElementById('filterTagOver');
  const tagNew = document.getElementById('filterTagNew');

  // Bổ sung danh sách chuyên khoa vào select
  if (specSelect) {
    const specs = Array.from(new Set(doctors.map(d => d.specialty))).sort();
    specs.forEach(spec => {
      const opt = document.createElement('option');
      opt.value = spec;
      opt.textContent = spec;
      specSelect.appendChild(opt);
    });
  }

  let filtered = doctors.slice();
  const PAGE_SIZE = 8;
  let currentPage = 1;

  function applyFilters() {
    const keyword = (searchInput?.value || '').trim().toLowerCase();
    const gender = genderSelect?.value || '';
    const spec = specSelect?.value || '';

    const selectedTags = [];
    if (tagVideo?.checked) selectedTags.push(tagVideo.value);
    if (tagOver?.checked) selectedTags.push(tagOver.value);
    if (tagNew?.checked) selectedTags.push(tagNew.value);

    filtered = doctors.filter(d => {
      if (gender && d.gender !== gender) return false;
      if (spec && d.specialty !== spec) return false;

      if (keyword) {
        const blob = (d.name + ' ' + d.specialty).toLowerCase();
        if (!blob.includes(keyword)) return false;
      }

      if (selectedTags.length) {
        if (!selectedTags.some(t => d.tags.includes(t))) return false;
      }

      return true;
    });

    currentPage = 1;
    render();
  }

  function render() {
    grid.innerHTML = '';

    if (countEl) countEl.textContent = String(filtered.length);

    if (!filtered.length) {
      if (emptyEl) emptyEl.hidden = false;
      if (pagEl) pagEl.innerHTML = '';
      return;
    }
    if (emptyEl) emptyEl.hidden = true;

    const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (currentPage > pageCount) currentPage = pageCount;

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    pageItems.forEach(d => {
      const card = document.createElement('article');
      card.className = 'doctor-card';

      // avatar
      const avatar = document.createElement('div');
      avatar.className = 'doctor-avatar';
      if (d.photo) {
        const img = document.createElement('img');
        img.src = d.photo;
        img.alt = d.name;
        avatar.appendChild(img);
      } else {
        avatar.style.backgroundColor = d.avatar || '#e5e7eb';
        const lastName = d.name.split(' ').slice(-1)[0] || d.name;
        avatar.textContent = lastName[0] || '?';
      }

      // info
      const info = document.createElement('div');
      info.className = 'doctor-info';

      const nameEl = document.createElement('h3');
      nameEl.textContent = d.name;

      const specEl = document.createElement('div');
      specEl.className = 'doctor-specialty';
      const specLink = document.createElement('a');
      specLink.href = `dat-lich-kham.html?spec=${encodeURIComponent(d.specialty)}`;
      specLink.textContent = d.specialty;
      specEl.appendChild(specLink);

      const meta = document.createElement('div');
      meta.className = 'doctor-meta';
      meta.innerHTML = `
        <span>${d.gender === 'Nam' ? '👨‍⚕️' : '👩‍⚕️'} ${d.gender}</span>
        <span>• ${d.exp} năm kinh nghiệm</span>
        <span>• ⭐ ${d.rating.toFixed(1)}</span>
      `;

      const tagsWrap = document.createElement('div');
      tagsWrap.className = 'doctor-tags';
      d.tags.forEach(t => {
        const tag = document.createElement('span');
        tag.className = 'doctor-tag';
        tag.textContent = t;
        tagsWrap.appendChild(tag);
      });

      const actions = document.createElement('div');
      actions.className = 'doctor-actions';
      const btnBook = document.createElement('button');
      btnBook.type = 'button';
      btnBook.className = 'doctor-btn primary';
      btnBook.textContent = 'Đặt lịch khám';
      btnBook.addEventListener('click', () => {
        window.location.href = `dat-lich-kham.html?spec=${encodeURIComponent(d.specialty)}&doctor=${encodeURIComponent(d.id)}`;
      });

      const btnDetail = document.createElement('button');
      btnDetail.type = 'button';
      btnDetail.className = 'doctor-btn outline';
      btnDetail.textContent = 'Xem chi tiết';
      btnDetail.addEventListener('click', () => openDoctorModal(d));

      actions.appendChild(btnBook);
      actions.appendChild(btnDetail);

      info.appendChild(nameEl);
      info.appendChild(specEl);
      info.appendChild(meta);
      if (d.tags.length) info.appendChild(tagsWrap);
      info.appendChild(actions);

      card.appendChild(avatar);
      card.appendChild(info);

      grid.appendChild(card);
    });

    renderPagination(pageCount);
  }

  function renderPagination(pageCount) {
    if (!pagEl) return;
    pagEl.innerHTML = '';
    if (pageCount <= 1) return;

    for (let p = 1; p <= pageCount; p++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = p;
      btn.className = 'page-btn' + (p === currentPage ? ' is-active' : '');
      btn.addEventListener('click', () => {
        currentPage = p;
        render();
      });
      pagEl.appendChild(btn);
    }
  }

  // Bắt sự kiện filters
  searchInput?.addEventListener('input', applyFilters);
  genderSelect?.addEventListener('change', applyFilters);
  specSelect?.addEventListener('change', applyFilters);
  [tagVideo, tagOver, tagNew].forEach(chk => {
    chk?.addEventListener('change', applyFilters);
  });

  applyFilters();
}
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('doctorsGrid')) {
    initDoctorsPage();
  }
});
// ====== Dat lich kham ======
const specialtyDisplayMap = {
  'Nhi khoa': 'Nhi khoa',
  'Tim mach': 'Tim mach',
  'Chan thuong chinh hinh': 'Chan thuong chinh hinh',
  'Tai mui hong': 'Tai mui hong',
  'Noi than kinh': 'Noi than kinh',
  'San phu': 'San phu khoa',
  'Rang ham mat': 'Rang ham mat',
  'Mat': 'Mat',
  'Da lieu': 'Da lieu',
  'Noi tiet': 'Noi tiet',
  'Tiet nieu': 'Tiet nieu'
};

function initBookingPage() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  const urlParams = new URLSearchParams(window.location.search);
  const presetSpec = urlParams.get('spec') || '';
  const presetDoctorId = parseInt(urlParams.get('doctor') || '', 10) || null;

  const select = document.getElementById('specialtySelect');
  const doctorSelect = document.getElementById('doctorSelect');
  const deptLabel = document.getElementById('selectedDept');
  const dayPicker = document.getElementById('dayPicker');
  const slotList = document.getElementById('slotList');
  const slotNote = document.getElementById('slotNote');
  const successBox = document.getElementById('bookingSuccess');

  const BASE_SLOTS = ['08:00', '08:30', '09:00', '09:30', '10:00', '13:30', '14:00', '15:00'];
  const bookings = new Set(); // key: specialty|doctor|date|slot
  let days = [];
  let selectedDate = '';
  let selectedSlot = '';
  let selectedDoctorId = '';

  function getDisplayName(raw) {
    return specialtyDisplayMap[raw] || raw;
  }

  function getDoctorById(id) {
    return doctors.find(d => String(d.id) === String(id));
  }

  function buildSpecialtyOptions() {
    if (!Array.isArray(doctors) || !select) return;
    const specs = Array.from(new Set(doctors.map(d => d.specialty))).sort((a, b) =>
      getDisplayName(a).localeCompare(getDisplayName(b), 'vi', { sensitivity: 'base' })
    );
    specs.forEach(spec => {
      const opt = document.createElement('option');
      opt.value = spec;
      opt.textContent = getDisplayName(spec);
      select.appendChild(opt);
    });

    if (presetSpec && specs.includes(presetSpec)) {
      select.value = presetSpec;
      if (deptLabel) deptLabel.textContent = getDisplayName(presetSpec);
    }

    // nếu chọn preset doctor mà chưa có khoa, set theo doctor
    if (!select.value && presetDoctorId) {
      const doc = getDoctorById(presetDoctorId);
      if (doc) {
        select.value = doc.specialty;
        if (deptLabel) deptLabel.textContent = getDisplayName(doc.specialty);
      }
    }
  }

  function buildDoctorOptions(spec) {
    if (!doctorSelect) return;
    doctorSelect.innerHTML = '<option value=\"\">— Chọn bác sĩ —</option>';
    const list = Array.isArray(doctors)
      ? doctors.filter(d => !spec || d.specialty === spec)
      : [];

    list.forEach(d => {
      const opt = document.createElement('option');
      opt.value = d.id;
      opt.textContent = d.name;
      doctorSelect.appendChild(opt);
    });

    const targetId = presetDoctorId && list.some(d => d.id === presetDoctorId)
      ? String(presetDoctorId)
      : '';

    if (targetId) {
      doctorSelect.value = targetId;
      selectedDoctorId = targetId;
    } else {
      selectedDoctorId = doctorSelect.value || '';
    }
  }

  function buildDays() {
    days = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const value = d.toISOString().slice(0, 10);
      const label = `${d.getDate()}/${d.getMonth() + 1}`;
      const dow = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'][d.getDay()];
      days.push({ value, label, dow });
    }
    if (!selectedDate && days.length) {
      selectedDate = days[0].value;
    }
  }

  function renderDays() {
    if (!dayPicker) return;
    dayPicker.innerHTML = '';
    days.forEach(day => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'day-pill' + (day.value === selectedDate ? ' active' : '');
      btn.innerHTML = `<strong>${day.label}</strong><span>${day.dow}</span>`;
      btn.addEventListener('click', () => {
        selectedDate = day.value;
        selectedSlot = '';
        renderDays();
        renderSlots();
      });
      dayPicker.appendChild(btn);
    });
  }

  function clearErrors() {
    document.querySelectorAll('.error').forEach(el => { el.textContent = ''; });
  }

  function showError(name, message) {
    const el = document.querySelector(`.error[data-error="${name}"]`);
    if (el) el.textContent = message;
  }

  function renderSlots() {
    if (!slotList) return;
    slotList.innerHTML = '';
    const spec = select?.value || '';
    if (!spec) {
      if (slotNote) slotNote.textContent = 'Chọn khoa và ngày để xem giờ trống.';
      return;
    }
    const doctorId = selectedDoctorId || doctorSelect?.value || '';
    if (!doctorId) {
      if (slotNote) slotNote.textContent = 'Chọn bác sĩ để xem giờ trống.';
      return;
    }
    if (!selectedDate) {
      if (slotNote) slotNote.textContent = 'Chọn ngày để xem giờ trống.';
      return;
    }
    if (slotNote) slotNote.textContent = 'Chọn giờ khám.';

    BASE_SLOTS.forEach(time => {
      const key = `${spec}|${doctorId}|${selectedDate}|${time}`;
      const isBusy = bookings.has(key);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'slot-btn ' + (isBusy ? 'busy' : 'free') + (selectedSlot === time ? ' active' : '');
      btn.textContent = time + (isBusy ? ' (đã đặt)' : '');
      btn.disabled = isBusy;
      btn.addEventListener('click', () => {
        selectedSlot = time;
        renderSlots();
      });
      slotList.appendChild(btn);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    if (successBox) {
      successBox.hidden = true;
      successBox.textContent = '';
    }

    const fullName = document.getElementById('fullName')?.value.trim();
    const cccd = document.getElementById('cccd')?.value.trim();
    const specialty = select?.value || '';
    const doctorId = selectedDoctorId || doctorSelect?.value || '';
    const doctorObj = getDoctorById(doctorId);

    let valid = true;

    if (!fullName) {
      showError('fullName', 'Vui lòng nhập họ tên.');
      valid = false;
    }

    if (!/^[0-9]{12}$/.test(cccd || '')) {
      showError('cccd', 'CCCD phải đúng 12 chữ số.');
      valid = false;
    }

    if (!specialty) {
      showError('specialty', 'Vui lòng chọn khoa.');
      valid = false;
    }

    if (!selectedDate) {
      showError('specialty', 'Chọn thêm ngày khám.');
      valid = false;
    }

    if (!selectedSlot) {
      showError('specialty', 'Chọn giờ khám.');
      valid = false;
    }

    if (!doctorId) {
      showError('doctor', 'Vui lòng chọn bác sĩ.');
      valid = false;
    }

    if (!valid) return;

    const key = `${specialty}|${doctorId}|${selectedDate}|${selectedSlot}`;
    bookings.add(key);
    renderSlots();

    if (successBox) {
      successBox.hidden = false;
      const docName = doctorObj?.name || 'Bác sĩ đã chọn';
      successBox.textContent = `Đã đặt thành công cho ${fullName} - ${docName} - ${getDisplayName(specialty)} - ${selectedDate} lúc ${selectedSlot}.`;
    }
  });

  select?.addEventListener('change', () => {
    const spec = select.value || '';
    if (deptLabel) deptLabel.textContent = spec ? getDisplayName(spec) : 'Chua chon khoa';
    buildDoctorOptions(spec);
    selectedDoctorId = doctorSelect?.value || '';
    selectedSlot = '';
    renderSlots();
  });

  doctorSelect?.addEventListener('change', () => {
    selectedDoctorId = doctorSelect.value || '';
    renderSlots();
  });

  select?.addEventListener('mousedown', () => {
    if (select.size === 1) {
      select.blur();
      setTimeout(() => select.focus({ preventScroll: true }), 0);
    }
  });

  buildSpecialtyOptions();
  buildDoctorOptions(select?.value || presetSpec || '');
  buildDays();
  renderDays();
  renderSlots();

  // auto render nếu có preset spec
  if (presetSpec || presetDoctorId) {
    renderSlots();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initBookingPage();
});
function initHeroSlider() {
  const slidesContainer = document.getElementById('heroSlides');
  const dots = document.querySelectorAll('#heroDots .dot');
  if (!slidesContainer || !dots.length) return;

  const slideCount = dots.length;
  let current = 0;
  let timer;

  function goTo(index) {
    current = (index + slideCount) % slideCount;
    slidesContainer.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  function stopAuto() {
    if (timer) clearInterval(timer);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      startAuto();
    });
  });

  goTo(0);
  startAuto();
}
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
});

// ====== Doctor modal (detail) ======
let doctorModalOverlay;
let doctorModal;

function ensureDoctorModal() {
  if (doctorModalOverlay) return;
  doctorModalOverlay = document.createElement('div');
  doctorModalOverlay.className = 'doctor-modal-overlay';

  doctorModal = document.createElement('div');
  doctorModal.className = 'doctor-modal';
  doctorModal.innerHTML = `
    <div class="doctor-modal-head">
      <h3>Thông tin bác sĩ</h3>
      <button class="doctor-modal-close" aria-label="Đóng">&times;</button>
    </div>
    <div class="doctor-modal-body">
      <div class="doctor-modal-photo">
        <img src="" alt="Ảnh bác sĩ" id="docPhoto" />
      </div>
      <div class="doctor-modal-info">
        <h2 id="docName"></h2>
        <div class="doc-chip spec" id="docSpec"></div>
        <div class="doc-chip email" id="docEmail"></div>
        <ul class="doc-meta">
          <li><span>Giới tính:</span><strong id="docGender"></strong></li>
          <li><span>Kinh nghiệm:</span><strong id="docExp"></strong></li>
          <li><span>Đánh giá:</span><strong id="docRating"></strong></li>
        </ul>
        <div class="doc-tags" id="docTags"></div>
      </div>
    </div>
  `;

  doctorModalOverlay.appendChild(doctorModal);
  document.body.appendChild(doctorModalOverlay);

  const closeBtn = doctorModal.querySelector('.doctor-modal-close');
  closeBtn.addEventListener('click', closeDoctorModal);
  doctorModalOverlay.addEventListener('click', (e) => {
    if (e.target === doctorModalOverlay) closeDoctorModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDoctorModal();
  });
}

function closeDoctorModal() {
  if (doctorModalOverlay) {
    doctorModalOverlay.classList.remove('open');
  }
}

function openDoctorModal(doctor) {
  ensureDoctorModal();
  const photoEl = document.getElementById('docPhoto');
  const nameEl = document.getElementById('docName');
  const specEl = document.getElementById('docSpec');
  const emailEl = document.getElementById('docEmail');
  const genderEl = document.getElementById('docGender');
  const expEl = document.getElementById('docExp');
  const ratingEl = document.getElementById('docRating');
  const tagsEl = document.getElementById('docTags');

  nameEl.textContent = doctor.name;
  specEl.textContent = doctor.specialty;
  const emailSlug = (doctor.name || 'bacsi').toLowerCase().replace(/\s+/g, '.').replace(/[^a-z\\.]/g, '');
  emailEl.textContent = `${emailSlug}@hospital.sunshine`;
  genderEl.textContent = doctor.gender || '—';
  expEl.textContent = `${doctor.exp || 0} năm`;
  ratingEl.textContent = doctor.rating ? `${doctor.rating.toFixed(1)} / 5` : '—';

  tagsEl.innerHTML = '';
  (doctor.tags || []).forEach(t => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = t;
    tagsEl.appendChild(tag);
  });
  if (!doctor.tags || !doctor.tags.length) {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = 'Bác sĩ chuyên khoa';
    tagsEl.appendChild(tag);
  }

  const photoUrl = doctor.photo || `https://images.unsplash.com/photo-1527610276295-1f8a8f10c76b?auto=format&fit=crop&w=800&q=80&sig=${doctor.id}`;
  photoEl.src = photoUrl;

  doctorModalOverlay.classList.add('open');
}

