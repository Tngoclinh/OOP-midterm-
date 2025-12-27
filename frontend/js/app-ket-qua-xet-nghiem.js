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

const labData = [
  {
    name: 'Nguyễn Văn A',
    cccd: '012345678901',
    tests: [
      { item: 'Công thức máu', value: 'Bình thường', note: 'Không bất thường', ref: '' },
      { item: 'Glucose máu', value: '5.2 mmol/L', note: 'Trong giới hạn', ref: '3.9 - 6.4' },
      { item: 'Chức năng thận (Creatinine)', value: '0.9 mg/dL', note: 'Trong giới hạn', ref: '0.7 - 1.3' },
      { item: 'Men gan ALT', value: '32 U/L', note: 'Trong giới hạn', ref: '< 40' }
    ]
  },
  {
    name: 'Trần Thị B',
    cccd: '098765432109',
    tests: [
      { item: 'Công thức máu', value: 'Hồng cầu hơi thấp', note: 'Theo dõi thiếu máu nhẹ', ref: '' },
      { item: 'Ferritin', value: '15 ng/mL', note: 'Giới hạn thấp', ref: '15 - 150' }
    ]
  }
];

function normalizeName(str) {
  return (str || '').toLowerCase().trim();
}

function findResult(name, cccd) {
  const normName = normalizeName(name);
  return labData.find(
    (p) => normalizeName(p.name) === normName && (p.cccd || '').trim() === cccd.trim()
  );
}

function clearErrors() {
  document.querySelectorAll('.error').forEach((el) => (el.textContent = ''));
}

function showError(field, msg) {
  const el = document.querySelector(`.error[data-error="${field}"]`);
  if (el) el.textContent = msg;
}

function renderResult(data) {
  const section = document.getElementById('labResult');
  const status = document.getElementById('labStatus');
  const detail = document.getElementById('labDetail');
  if (!section || !status || !detail) return;

  section.hidden = false;
  detail.innerHTML = '';

  if (!data) {
    status.textContent = 'Bệnh nhân hiện chưa có kết quả xét nghiệm.';
    status.className = 'lab-status warn';
    return;
  }

  status.textContent = `Kết quả của ${data.name} (CCCD: ${data.cccd})`;
  status.className = 'lab-status success';

  const list = document.createElement('div');
  list.className = 'lab-table';
  data.tests.forEach((t) => {
    const row = document.createElement('div');
    row.className = 'lab-row';
    row.innerHTML = `
      <div class="lab-cell item">${t.item}</div>
      <div class="lab-cell value">${t.value}</div>
      <div class="lab-cell note">${t.note || ''}</div>
      <div class="lab-cell ref">${t.ref || ''}</div>
    `;
    list.appendChild(row);
  });
  detail.appendChild(list);
}

document.addEventListener('DOMContentLoaded', () => {
  initChatWidget();

  const form = document.getElementById('labLookupForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    const name = document.getElementById('patientName')?.value || '';
    const cccd = document.getElementById('patientCCCD')?.value || '';

    let valid = true;
    if (!name.trim()) {
      showError('patientName', 'Vui lòng nhập họ tên.');
      valid = false;
    }
    if (!/^[0-9]{12}$/.test(cccd.trim())) {
      showError('patientCCCD', 'CCCD phải đủ 12 chữ số.');
      valid = false;
    }
    if (!valid) return;

    const found = findResult(name, cccd);
    renderResult(found);
  });
});
