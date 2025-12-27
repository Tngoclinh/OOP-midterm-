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

const newsData = [
  {
    title: 'Bộ Y tế xây dựng gói dịch vụ y tế cơ bản thu gọn phạm vi miễn viện phí',
    desc: 'Chủ trương miễn viện phí nhằm bảo đảm quyền được chăm sóc sức khỏe.',
    link: 'tin-1.html',
  },
  {
    title: 'WHO khuyến nghị Việt Nam mạnh tay với thuốc lá điện tử',
    desc: 'Đề xuất chiến dịch quyết liệt để kiểm soát thuốc lá điện tử.',
    link: 'tin-2.html',
  },
  {
    title: 'Hiện thực hóa hành động kiểm soát sốt xuất huyết',
    desc: 'Hội nghị nhấn mạnh hành động toàn diện trong kiểm soát dịch.',
    link: 'tin-3.html',
  },
  {
    title: 'Siết chặt chất lượng đào tạo ngành y, chuẩn hóa thực hành',
    desc: 'Chuẩn hóa đào tạo, siết điều kiện máy ngành nhằm nâng cao chất lượng nhân lực.',
    link: 'tin-4.html',
  },
  {
    title: 'Diễn tập ứng phó bảo đảm an toàn bức xạ trong y tế',
    desc: 'Bệnh viện diễn tập kịch bản sự cố bức xạ, nâng năng lực ứng phó.',
    link: 'tin-5.html',
  },
  {
    title: 'Ngày Thế giới phòng, chống AIDS: cảnh báo trở lại và lây nhiễm âm thầm',
    desc: 'Tăng truyền thông, nguồn lực, dịch vụ thân thiện để giảm lây nhiễm.',
    link: 'tin-6.html',
  },
  {
    title: '70% dịch bệnh bắt nguồn từ động vật: cần củng cố tuyến y tế cộng đồng',
    desc: 'Nhấn mạnh hoàn thiện pháp luật và nâng lực tuyến y tế cộng đồng để ứng phó.',
    link: 'tin-7.html',
  },
];

function renderDoctorResults(list) {
  const wrap = document.getElementById('searchResults');
  const count = document.getElementById('searchDocCount');
  if (!wrap || !count) return;
  wrap.innerHTML = '';
  count.textContent = list.length ? `${list.length} kết quả` : '0 kết quả';

  list.forEach((d) => {
    const card = document.createElement('article');
    card.className = 'search-card';

    const avatar = document.createElement('div');
    avatar.className = 'search-avatar';
    if (d.photo) {
      const img = document.createElement('img');
      img.src = d.photo;
      img.alt = d.name;
      avatar.appendChild(img);
    } else {
      avatar.textContent = (d.name || '?').slice(0, 1);
    }

    const info = document.createElement('div');
    info.className = 'search-info';
    info.innerHTML = `
      <h3>${d.name}</h3>
      <div class="search-spec">${d.specialty}</div>
      <div class="search-meta">Kinh nghiệm: ${d.exp} năm - Đánh giá: ${d.rating?.toFixed(1) || '...'} </div>
    `;

    const actions = document.createElement('div');
    actions.className = 'search-actions';
    const link = document.createElement('a');
    link.href = `dat-lich-kham.html?spec=${encodeURIComponent(d.specialty)}&doctor=${encodeURIComponent(d.id)}`;
    link.className = 'search-btn';
    link.textContent = 'Đặt lịch';
    actions.appendChild(link);

    card.appendChild(avatar);
    card.appendChild(info);
    card.appendChild(actions);
    wrap.appendChild(card);
  });
}

function renderNewsResults(list) {
  const wrap = document.getElementById('searchNews');
  const count = document.getElementById('searchNewsCount');
  if (!wrap || !count) return;
  wrap.innerHTML = '';
  count.textContent = list.length ? `${list.length} kết quả` : '0 kết quả';

  list.forEach((n) => {
    const card = document.createElement('article');
    card.className = 'search-card search-card-news';
    card.innerHTML = `
      <div class="search-info">
        <h3>${n.title}</h3>
        <p class="search-news-desc">${n.desc}</p>
      </div>
      <div class="search-actions">
        <a class="search-btn" href="${n.link}">Xem chi tiết</a>
      </div>
    `;
    wrap.appendChild(card);
  });
}

function doSearch(q) {
  const empty = document.getElementById('searchEmpty');
  if (!Array.isArray(doctors)) return;
  const keyword = (q || '').trim().toLowerCase();
  if (!keyword) {
    renderDoctorResults([]);
    renderNewsResults([]);
    if (empty) empty.hidden = false;
    return;
  }

  const results = doctors.filter((d) => {
    const blob = [d.name, d.specialty, ...(d.tags || [])].join(' ').toLowerCase();
    return blob.includes(keyword);
  });
  const newsResults = newsData.filter((n) => {
    const blob = (n.title + ' ' + (n.desc || '')).toLowerCase();
    return blob.includes(keyword);
  });

  renderDoctorResults(results);
  renderNewsResults(newsResults);
  if (empty) empty.hidden = !!(results.length || newsResults.length);
}

document.addEventListener('DOMContentLoaded', () => {
  initChatWidget();

  const params = new URLSearchParams(window.location.search);
  const q = params.get('q') || '';
  const input = document.getElementById('searchInput');
  if (input) input.value = q;
  doSearch(q);

  document.getElementById('searchForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const keyword = input?.value || '';
    const url = new URL(window.location.href);
    url.searchParams.set('q', keyword);
    window.history.replaceState({}, '', url.toString());
    doSearch(keyword);
  });
});
