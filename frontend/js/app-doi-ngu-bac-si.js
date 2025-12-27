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
  doctorModalOverlay?.classList.remove('open');
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
  genderEl.textContent = doctor.gender || '...';
  expEl.textContent = `${doctor.exp || 0} năm`;
  ratingEl.textContent = doctor.rating ? `${doctor.rating.toFixed(1)} / 5` : '...';

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

function initDoctorsPage() {
  const grid = document.getElementById('doctorsGrid');
  if (!grid) return;

  const countEl = document.getElementById('doctorCount');
  const emptyEl = document.getElementById('doctorsEmpty');
  const pagEl = document.getElementById('doctorsPagination');

  const searchInput = document.getElementById('doctorSearch');
  const genderSelect = document.getElementById('filterGender');
  const specSelect = document.getElementById('filterSpecialty');
  const tagVideo = document.getElementById('filterTagVideo');
  const tagOver = document.getElementById('filterTagOver');
  const tagNew = document.getElementById('filterTagNew');

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
        <span>Giới tính: ${d.gender}</span>
        <span>Kinh nghiệm: ${d.exp} năm</span>
        <span>Đánh giá: ${d.rating.toFixed(1)}</span>
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

  searchInput?.addEventListener('input', applyFilters);
  genderSelect?.addEventListener('change', applyFilters);
  specSelect?.addEventListener('change', applyFilters);
  [tagVideo, tagOver, tagNew].forEach(chk => {
    chk?.addEventListener('change', applyFilters);
  });

  applyFilters();
}

document.addEventListener('DOMContentLoaded', () => {
  initChatWidget();
  if (document.getElementById('doctorsGrid')) {
    initDoctorsPage();
  }
});
