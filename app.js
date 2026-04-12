// 1. Função de Pesquisa com Efeito de "IA a Processar"
function executeSearch() {
  const dest = document.getElementById('dest-input').value;
  if(!dest) {
    alert("🌍 Please enter a destination!");
    return;
  }

  // Mostra a página de resultados imediatamente
  showPage('results');
  
  // Cria o efeito de pensamento da IA
  const titleEl = document.getElementById('results-title');
  const alertEl = document.getElementById('alert-text');
  
  if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Tripoupa AI is analyzing deals for ${dest}...`;
  if (alertEl) alertEl.innerText = "Comparing 34+ providers for the best price...";

  // Espera 2.5 segundos para parecer real e depois abre o link
  setTimeout(() => {
    if (titleEl) titleEl.innerHTML = `✈️ Best Deals found for ${dest}!`;
    if (alertEl) alertEl.innerText = "Check the best options we found for you below.";
    
    const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(dest)}&aid=678910`;
    window.open(url, '_blank');
  }, 2500);
}

// 2. Função para os cartões (Lisboa, Roma, etc.)
function openAffiliate(city) {
  const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city)}&aid=678910`;
  window.open(url, '_blank');
}

// 3. Função do Assistente de IA
function askAI() {
  const input = document.getElementById('ai-input').value;
  
  if (!input) {
    alert("🤖 Por favor, escreve um destino ou uma pergunta!");
    return;
  }

  // Simulação visual de análise
  const btn = event.target; // Pega o botão clicado
  const originalText = btn.innerText;
  btn.innerText = "Analyzing...";
  btn.disabled = true;

  setTimeout(() => {
    const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(input)}&aid=678910`;
    window.open(url, '_blank');
    btn.innerText = originalText;
    btn.disabled = false;
  }, 1500);
}

// 4. Função para trocar de páginas (Navegação)
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) targetPage.classList.add('active');
  window.scrollTo(0, 0);
}

// 5. Atualizar o display do Budget (Opcional se usares o slider)
function updateBudget(val) {
  const display = document.getElementById('budget-display');
  if(display) display.innerText = `€${val}`;
}
