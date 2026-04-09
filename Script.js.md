#   
  
  
  
/* ═══════════════════════════════════════════  
   TRIPOUPA — app.js  
   AI-Powered Travel Platform  
   © 2025 Tripoupa  
═══════════════════════════════════════════ */  
  
/* ══════════════════════════════════════════  
   PAGE NAVIGATION  
══════════════════════════════════════════ */  
function showPage(p) {  
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));  
  document.getElementById('page-' + p).classList.add('active');  
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));  
  const navEl = document.getElementById('nav-' + p);  
  if (navEl) navEl.classList.add('active');  
  window.scrollTo(0, 0);  
}  
  
/* ══════════════════════════════════════════  
   STICKY NAVBAR SHADOW ON SCROLL  
══════════════════════════════════════════ */  
window.addEventListener('scroll', () => {  
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);  
});  
  
/* ══════════════════════════════════════════  
   ANIMATED HERO PARTICLES  
══════════════════════════════════════════ */  
(function initParticles() {  
  const container = document.getElementById('particles');  
  for (let i = 0; i < 20; i++) {  
    const dot = document.createElement('div');  
    dot.className = 'particle';  
    const size = Math.random() * 60 + 20;  
    dot.style.cssText = [  
      `width:${size}px`,  
      `height:${size}px`,  
      `left:${Math.random() * 100}%`,  
      `animation-duration:${Math.random() * 20 + 15}s`,  
      `animation-delay:${Math.random() * -20}s`,  
      `background:${Math.random() > 0.5 ? 'rgba(26,111,244,.4)' : 'rgba(0,196,140,.3)'}`,  
    ].join(';');  
    container.appendChild(dot);  
  }  
})();  
  
/* ══════════════════════════════════════════  
   BUDGET SLIDER  
══════════════════════════════════════════ */  
function updateBudget(value) {  
  document.getElementById('budget-display').textContent = '€' + parseInt(value).toLocaleString();  
  const pct = ((value - 200) / (5000 - 200)) * 100;  
  // Update only the hero search slider (first range input)  
  const slider = document.querySelector('#page-home input[type=range]');  
  if (slider) {  
    slider.style.background = `linear-gradient(to right, var(--blue) ${pct}%, var(--border) ${pct}%)`;  
  }  
}  
  
/* ── Set default departure/return dates (today + 14 / + 21 days) ── */  
(function setDefaultDates() {  
  const depart = new Date();  
  depart.setDate(depart.getDate() + 14);  
  const ret = new Date(depart);  
  ret.setDate(ret.getDate() + 7);  
  const fmt = d => d.toISOString().split('T')[0];  
  const departEl = document.getElementById('depart-date');  
  const returnEl = document.getElementById('return-date');  
  if (departEl) departEl.value = fmt(depart);  
  if (returnEl) returnEl.value = fmt(ret);  
})();  
  
/* ══════════════════════════════════════════  
   SEARCH TABS  
══════════════════════════════════════════ */  
function setTab(el) {  
  document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));  
  el.classList.add('active');  
}  
  
/* ══════════════════════════════════════════  
   SORT CHIPS  
══════════════════════════════════════════ */  
function setSort(el) {  
  document.querySelectorAll('.sort-chip').forEach(t => t.classList.remove('active'));  
  el.classList.add('active');  
}  
  
/* ══════════════════════════════════════════  
   TOAST NOTIFICATION  
══════════════════════════════════════════ */  
let toastTimer;  
  
function showToast(msg) {  
  const toast = document.getElementById('toast');  
  toast.textContent = msg;  
  toast.style.display = 'flex';  
  clearTimeout(toastTimer);  
  toastTimer = setTimeout(() => { toast.style.display = 'none'; }, 3000);  
}  
  
/* ══════════════════════════════════════════  
   AI CHAT — RESPONSE LIBRARY  
══════════════════════════════════════════ */  
const aiResponses = {  
  beach: {  
    text: [  
      "🏖️ Great choice! I found 3 amazing beach trips under your budget:\n\n",  
      "**1. Algarve, Portugal** — €247/person\n",  
      "✈️ Direct · 7 nights · 4★ resort\nSave €89 vs average!\n\n",  
      "**2. Costa del Sol, Spain** — €219/person\n",  
      "✈️ Direct · 7 nights · 3★ hotel\nSave €112 vs booking separately!\n\n",  
      "**3. Hvar, Croatia** — €289/person\n",  
      "✈️ 1 stop · 7 nights · Boutique hotel\nSave €67 vs average!\n\n",  
      "The **Algarve** is your best value pick this month 🌟",  
    ].join(''),  
    cards: [  
      { dest: "🇵🇹 Algarve",       price: "€247", save: "Save €89",  img: "https://images.unsplash.com/photo-1555990538-1078ea06e58e?w=300" },  
      { dest: "🇪🇸 Costa del Sol", price: "€219", save: "Save €112", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300" },  
      { dest: "🇭🇷 Hvar",          price: "€289", save: "Save €67",  img: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=300" },  
    ],  
  },  
  
  city: {  
    text: [  
      "🏙️ For a cheap city break this weekend, here are the top picks:\n\n",  
      "**Best deal: Budapest, Hungary** — €143/person\n",  
      "✈️ 1h 45m · 3 nights · 4★ hotel\nThat's 34% below the average price right now!\n\n",  
      "**Also great:**\n",  
      "• 🇷🇴 Bucharest — €112/person\n",  
      "• 🇵🇱 Krakow — €128/person\n",  
      "• 🇸🇰 Bratislava — €98/person\n\n",  
      "Want me to check if flexible dates give even cheaper options?",  
    ].join(''),  
    cards: [  
      { dest: "🇭🇺 Budapest",  price: "€143", save: "Save €74", img: "https://images.unsplash.com/photo-1565799600393-a7c2eb6fe1da?w=300" },  
      { dest: "🇷🇴 Bucharest", price: "€112", save: "Save €55", img: "https://images.unsplash.com/photo-1555990538-1078ea06e58e?w=300" },  
    ],  
  },  
  
  family: {  
    text: [  
      "👨‍👩‍👧 Family trips for 4 are my specialty! With a €1500 budget:\n\n",  
      "**Top pick: Rhodes, Greece** — €1,380 total (€345/person)\n",  
      "✈️ Direct · 7 nights · 4★ family resort\n",  
      "• 2 rooms included\n• Kids club & pool\n• All-inclusive option at +€200\n\n",  
      "You save **€320** vs booking each part separately!\n\n",  
      "Alternatives:\n• 🇲🇦 Marrakech — €1,240 total\n• 🇪🇸 Mallorca — €1,460 total\n\n",  
      "Want me to show the Rhodes deal in detail?",  
    ].join(''),  
    cards: [  
      { dest: "🇬🇷 Rhodes",    price: "€1,380", save: "Save €320", img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=300" },  
      { dest: "🇲🇦 Marrakech", price: "€1,240", save: "Save €280", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=300" },  
    ],  
  },  
  
  bali: {  
    text: [  
      "📅 Checking flexible dates for Bali... 🔍\n\n",  
      "**Cheapest weeks to fly to Bali:**\n\n",  
      "• 🏆 **Nov 4–11** — €678/person (cheapest!)\n",  
      "• Nov 18–25 — €712/person\n",  
      "• Oct 28 – Nov 4 — €745/person\n\n",  
      "Flying **Tuesday or Wednesday** saves you ~€85 vs weekend flights!\n\n",  
      "The cheapest combo:\n",  
      "✈️ Frankfurt → DPS via Doha (Qatar Airways)\n",  
      "🏨 Ubud Komaneka Resort 4★\n",  
      "**Total: €678** — that's 31% below average!\n\n",  
      "Should I show you the full package details?",  
    ].join(''),  
    cards: [  
      { dest: "🇮🇩 Bali (Nov 4)", price: "€678", save: "Save €305", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300" },  
    ],  
  },  
  
  surprise: {  
    text: [  
      "🎲 Surprise mode activated! Let me find the absolute cheapest flight leaving soon...\n\n",  
      "🎉 **WINNER: Riga, Latvia** — €87/person!\n",  
      "✈️ Direct · 3 nights · 3★ boutique hotel\n\n",  
      "Riga is absolutely gorgeous — cobblestone old town, amazing food scene, ",  
      "and incredibly cheap to live once you're there. Average meal: €8!\n\n",  
      "Leaving **this Saturday** from Paris.\nTotal for 2: **€174** 🤯\n\n",  
      "That's 67% below the average European city break price. Want to grab it before it's gone?",  
    ].join(''),  
    cards: [  
      { dest: "🇱🇻 Riga", price: "€87", save: "Save €180", img: "https://images.unsplash.com/photo-1555990538-1078ea06e58e?w=300" },  
    ],  
  },  
};  
  
/* ══════════════════════════════════════════  
   AI CHAT — INTENT DETECTION  
══════════════════════════════════════════ */  
function detectIntent(msg) {  
  const m = msg.toLowerCase();  
  if (m.includes('beach') || m.includes('warm') || m.includes('sea') || m.includes('sun'))          return 'beach';  
  if (m.includes('city')  || m.includes('weekend') || m.includes('short'))                          return 'city';  
  if (m.includes('family')|| m.includes('kid') || m.includes('children'))                           return 'family';  
  if (m.includes('bali')  || m.includes('flexible') || m.includes('date') || m.includes('week'))    return 'bali';  
  if (m.includes('surprise') || m.includes('cheapest') || m.includes('anywhere') || m.includes('random')) return 'surprise';  
  return null;  
}  
  
/* ══════════════════════════════════════════  
   AI CHAT — DOM BUILDERS  
══════════════════════════════════════════ */  
function buildCardsHtml(cards) {  
  if (!cards || !cards.length) return '';  
  const items = cards.map(c => `  
    <div class="trip-suggestion-card" onclick="showPage('detail')">  
      <div class="sugg-img" style="background-image:url('${c.img}')"></div>  
      <div class="sugg-body">  
        <div class="sugg-dest">${c.dest}</div>  
        <div class="sugg-price">${c.price}/person</div>  
        <div class="sugg-save">🎉 ${c.save}</div>  
      </div>  
    </div>`).join('');  
  return `<div class="suggestions-row">${items}</div>`;  
}  
  
function addMsg(role, text, cards) {  
  const msgs     = document.getElementById('chatMessages');  
  const wrap     = document.createElement('div');  
  wrap.className = 'msg ' + role;  
  
  const avatarBg = role === 'ai'  
    ? 'background:linear-gradient(135deg,var(--blue),var(--purple))'  
    : 'background:linear-gradient(135deg,var(--green),var(--green-dark))';  
  
  const avatarChar = role === 'ai' ? '✈️' : '👤';  
  const label      = role === 'ai' ? 'AI Assistant' : 'You';  
  
  const formatted = text  
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  
    .replace(/\n/g, '<br/>');  
  
  wrap.innerHTML = `  
    <div class="msg-avatar" style="${avatarBg}">${avatarChar}</div>  
    <div class="msg-content">  
      <div class="msg-bubble">${formatted}${buildCardsHtml(cards)}</div>  
      <div class="msg-time">${label} · Just now</div>  
    </div>`;  
  
  msgs.appendChild(wrap);  
  msgs.scrollTop = msgs.scrollHeight;  
}  
  
function addTyping() {  
  const msgs     = document.getElementById('chatMessages');  
  const wrap     = document.createElement('div');  
  wrap.className = 'msg ai';  
  wrap.id        = 'typing';  
  wrap.innerHTML = `  
    <div class="msg-avatar" style="background:linear-gradient(135deg,var(--blue),var(--purple))">✈️</div>  
    <div class="msg-content">  
      <div class="msg-bubble">  
        <div class="typing-indicator">  
          <div class="typing-dot"></div>  
          <div class="typing-dot"></div>  
          <div class="typing-dot"></div>  
        </div>  
      </div>  
    </div>`;  
  msgs.appendChild(wrap);  
  msgs.scrollTop = msgs.scrollHeight;  
  return wrap;  
}  
  
/* ══════════════════════════════════════════  
   AI CHAT — SEND MESSAGE  
══════════════════════════════════════════ */  
function sendChat() {  
  const input = document.getElementById('chatInput');  
  const msg   = input.value.trim();  
  if (!msg) return;  
  
  addMsg('user', msg);  
  input.value      = '';  
  input.style.height = 'auto';  
  
  const typingEl = addTyping();  
  const intent   = detectIntent(msg);  
  
  setTimeout(() => {  
    typingEl.remove();  
    if (intent && aiResponses[intent]) {  
      const r = aiResponses[intent];  
      addMsg('ai', r.text, r.cards);  
    } else {  
      addMsg('ai',  
        `🔍 Searching for the best deals matching "<strong>${msg}</strong>"...\n\n` +  
        `I'm analyzing 34 partner sites right now. Based on your request, I found some great options!\n\n` +  
        `💡 **Tip:** The more specific you are (budget, dates, departure city), the better deals I can find.\n\n` +  
        `Could you tell me:\n• 📍 Your departure city?\n• 💰 Your total budget?\n• 📅 When are you planning to go?`  
      );  
    }  
  }, 1500);  
}  
  
function sendQuickPrompt(text) {  
  document.getElementById('chatInput').value = text;  
  sendChat();  
}  
  
/* ── Keyboard shortcut: Enter to send (Shift+Enter = newline) ── */  
function handleChatKey(e) {  
  if (e.key === 'Enter' && !e.shiftKey) {  
    e.preventDefault();  
    sendChat();  
  }  
}  
  
/* ── Auto-resize textarea as user types ── */  
function autoResize(el) {  
  el.style.height = 'auto';  
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';  
}  
