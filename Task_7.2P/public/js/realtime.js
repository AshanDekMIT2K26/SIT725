(() => {
  // connect to Socket.IO (same origin)
  const socket = io();

  // ===== Random number (1/sec from server)
  const numberEl = document.getElementById('rt-number');
  socket.on('number', (n) => {
    if (numberEl) numberEl.textContent = n;
  });

  // ===== Chat
  const log = document.getElementById('chat-log');
  const form = document.getElementById('chat-form');
  const nameEl = document.getElementById('chat-name');
  const msgEl = document.getElementById('chat-message');

  if (form && nameEl && msgEl && log) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameEl.value.trim() || 'Guest';
      const text = msgEl.value.trim();
      if (!text) return;

      socket.emit('chat:message', { name, text });
      msgEl.value = '';
      msgEl.focus();
    });

    socket.on('chat:message', (m) => {
      const p = document.createElement('p');
      const time = new Date(m.ts || Date.now()).toLocaleTimeString();
      p.textContent = `[${time}] ${m.name}: ${m.text}`;
      log.prepend(p);
    });
  }

  // ===== Optional: sensor demo
  const sensorBtn = document.getElementById('sensorBumpBtn');
  const sensorVal = document.getElementById('sensorValue');
  if (sensorBtn && sensorVal) {
    sensorBtn.addEventListener('click', () => {
      const current = Number(sensorVal.textContent) || 0;
      socket.emit('sensor:update', { value: current + 1 });
    });
    socket.on('sensor:update', (d) => {
      if (typeof d.value === 'number') sensorVal.textContent = d.value;
    });
  }

  // Materialize modals init
  document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    if (typeof M !== 'undefined' && modals.length) M.Modal.init(modals);
  });
})();
