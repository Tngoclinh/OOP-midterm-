function initChatWidget() {
  const chatWidget = document.getElementById('chatWidget');
  const chatBtn = document.querySelector('.chat-btn, .chat-fab');
  const chatClose = document.getElementById('chatCloseBtn');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');

  if (!chatWidget || chatWidget.dataset.bound === 'true') return;
  chatWidget.dataset.bound = 'true';

  const closeChat = () => chatWidget.classList.remove('open');

  chatBtn?.addEventListener('click', () => {
    chatWidget.classList.toggle('open');
    if (chatWidget.classList.contains('open')) {
      setTimeout(() => chatInput?.focus(), 50);
    }
  });

  chatClose?.addEventListener('click', closeChat);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeChat();
  });

  if (chatForm && chatInput && chatBody) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      const row = document.createElement('div');
      row.className = 'chat-message-row me';

      const bubble = document.createElement('div');
      bubble.className = 'chat-message-bubble me';
      bubble.textContent = text;

      row.appendChild(bubble);
      chatBody.appendChild(row);
      chatBody.scrollTop = chatBody.scrollHeight;

      chatInput.value = '';

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

const doctors = [
  { id: 1, name: 'Nguyễn Lan Anh', gender: 'Nữ', specialty: 'Nhi khoa', exp: 9, rating: 4.8, tags: ['Khám ngoài giờ', 'Tư vấn video'], avatar: '#c7d2fe', photo: '../assets/doctor-female-1.png' },
  { id: 2, name: 'Trần Quang Huy', gender: 'Nam', specialty: 'Tim mạch', exp: 15, rating: 4.9, tags: ['Nhận bệnh mới'], avatar: '#b9fbc0', photo: '../assets/doctor-male-1.png' },
  { id: 3, name: 'Lê Minh Tuấn', gender: 'Nam', specialty: 'Chấn thương chỉnh hình', exp: 12, rating: 4.7, tags: ['Tư vấn video'], avatar: '#ffd6a5', photo: '../assets/doctor-male-2.png' },
  { id: 4, name: 'Phạm Thùy Dương', gender: 'Nữ', specialty: 'Tai mũi họng', exp: 7, rating: 4.6, tags: [], avatar: '#f9c6d4', photo: '../assets/doctor-female-2.png' },
  { id: 5, name: 'Bùi Vân Nam', gender: 'Nam', specialty: 'Nội thần kinh', exp: 18, rating: 4.8, tags: ['Khám ngoài giờ', 'Nhận bệnh mới'], avatar: '#ffd6a5', photo: '../assets/doctor-male-3.png' },
  { id: 6, name: 'Đỗ Hồng Nhung', gender: 'Nữ', specialty: 'Sản phụ khoa', exp: 14, rating: 4.9, tags: ['Tư vấn video'], avatar: '#e9ff70', photo: '../assets/doctor-female-3.png' },
  { id: 7, name: 'Vũ Tiến Minh', gender: 'Nam', specialty: 'Răng hàm mặt', exp: 10, rating: 4.5, tags: ['Khám ngoài giờ'], avatar: '#caffbf', photo: '../assets/doctor-male-4.png' },
  { id: 8, name: 'Hồ Phương Linh', gender: 'Nữ', specialty: 'Mắt', exp: 6, rating: 4.4, tags: ['Nhận bệnh mới'], avatar: '#bdb2ff', photo: '../assets/doctor-female-4.png' },
  { id: 9, name: 'Đỗ Quốc Khánh', gender: 'Nam', specialty: 'Da liễu', exp: 11, rating: 4.6, tags: [], avatar: '#ffd6e7', photo: '../assets/doctor-male-5.png' },
  { id: 10, name: 'Tô Thanh Bình', gender: 'Nữ', specialty: 'Nội tiết', exp: 16, rating: 4.7, tags: ['Tư vấn video'], avatar: '#a7f3d0', photo: '../assets/doctor-female-5.png' },
  { id: 11, name: 'Nguyễn Quốc Anh', gender: 'Nam', specialty: 'Tiết niệu', exp: 8, rating: 4.5, tags: ['Khám ngoài giờ'], avatar: '#fecaca', photo: '../assets/doctor-male-6.png' },
  { id: 12, name: 'Lương Hải Yến', gender: 'Nữ', specialty: 'Nhi khoa', exp: 5, rating: 4.3, tags: [], avatar: '#fde68a', photo: '../assets/doctor-female-6.png' },
  { id: 13, name: 'Phan Nhật Minh', gender: 'Nam', specialty: 'Tim mạch', exp: 20, rating: 4.9, tags: ['Tư vấn video', 'Khám ngoài giờ'], avatar: '#bae6fd', photo: '../assets/doctor-male-7.png' },
  { id: 14, name: 'Đinh Thu Trang', gender: 'Nữ', specialty: 'Da liễu', exp: 9, rating: 4.6, tags: ['Nhận bệnh mới'], avatar: '#f5d0fe', photo: '../assets/doctor-female-7.png' },
];

const specialtyDisplayMap = {
  'Nhi khoa': 'Nhi khoa',
  'Tim mạch': 'Tim mạch',
  'Chấn thương chỉnh hình': 'Chấn thương chỉnh hình',
  'Tai mũi họng': 'Tai mũi họng',
  'Nội thần kinh': 'Nội thần kinh',
  'Sản phụ khoa': 'Sản phụ khoa',
  'Răng hàm mặt': 'Răng hàm mặt',
  'Mắt': 'Mắt',
  'Da liễu': 'Da liễu',
  'Nội tiết': 'Nội tiết',
  'Tiết niệu': 'Tiết niệu',
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
    return doctors.find((d) => String(d.id) === String(id));
  }

  function buildSpecialtyOptions() {
    if (!Array.isArray(doctors) || !select) return;
    const specs = Array.from(new Set(doctors.map((d) => d.specialty))).sort((a, b) =>
      getDisplayName(a).localeCompare(getDisplayName(b), 'vi', { sensitivity: 'base' })
    );
    specs.forEach((spec) => {
      const opt = document.createElement('option');
      opt.value = spec;
      opt.textContent = getDisplayName(spec);
      select.appendChild(opt);
    });

    if (presetSpec && specs.includes(presetSpec)) {
      select.value = presetSpec;
      if (deptLabel) deptLabel.textContent = getDisplayName(presetSpec);
    }

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
    doctorSelect.innerHTML = '<option value=\"\">Chọn bác sĩ</option>';
    const list = Array.isArray(doctors) ? doctors.filter((d) => !spec || d.specialty === spec) : [];

    list.forEach((d) => {
      const opt = document.createElement('option');
      opt.value = d.id;
      opt.textContent = d.name;
      doctorSelect.appendChild(opt);
    });

    const targetId = presetDoctorId && list.some((d) => d.id === presetDoctorId) ? String(presetDoctorId) : '';

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
    days.forEach((day) => {
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
    document.querySelectorAll('.error').forEach((el) => {
      el.textContent = '';
    });
  }

  function showError(name, message) {
    const el = document.querySelector(`.error[data-error=\"${name}\"]`);
    if (el) el.textContent = message;
  }

  function renderSlots() {
    if (!slotList) return;
    slotList.innerHTML = '';
    const spec = select?.value || '';
    if (!spec) {
      if (slotNote) slotNote.textContent = 'Chọn khoa để xem giờ trống.';
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

    BASE_SLOTS.forEach((time) => {
      const key = `${spec}|${doctorId}|${selectedDate}|${time}`;
      const isBusy = bookings.has(key);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'slot-btn ' + (isBusy ? 'busy' : 'free') + (selectedSlot === time ? ' active' : '');
      btn.textContent = time + (isBusy ? ' (Đã đặt)' : '');
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
      showError('specialty', 'Vui lòng chọn ngày khám.');
      valid = false;
    }

    if (!selectedSlot) {
      showError('specialty', 'Vui lòng chọn giờ khám.');
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
      successBox.textContent = `Đặt lịch thành công cho ${fullName} - ${docName} - ${getDisplayName(specialty)} - ${selectedDate} lúc ${selectedSlot}.`;
    }
  });

  select?.addEventListener('change', () => {
    const spec = select.value || '';
    if (deptLabel) deptLabel.textContent = spec ? getDisplayName(spec) : 'Chưa chọn khoa';
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

  if (presetSpec || presetDoctorId) {
    renderSlots();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initChatWidget();
  initBookingPage();
});
