// Função principal de pesquisa
function executeSearch() {
  const destination = document.getElementById('dest-input').value;
  
  if (!destination) {
    alert("🌍 Please enter a destination!");
    return;
  }

  // 1. Mostrar a página de resultados
  showPage('results');
  
  // 2. Atualizar o título da página de resultados
  const titleEl = document.getElementById('results-title');
  if (titleEl) titleEl.innerText = `✈️ Best Deals to ${destination}`;

  // 3. Abrir o Booking (Substitui o 678910 pelo teu ID quando fores aprovado)
  const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&aid=678910`;
  
  setTimeout(() => {
    window.open(url, '_blank');
  }, 500);
}

// Função para os cartões (Lisboa, Roma, etc.)
function openAffiliate(city) {
  const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city)}&aid=678910`;
  window.open(url, '_blank');
}

// Função para trocar de páginas
function showPage(pageId) {
  // Esconde todas as páginas
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Mostra a página desejada
  const targetPage = document.getElementById('page-' + pageId);
  if (targetPage) targetPage.classList.add('active');
  
  // Scroll para o topo
  window.scrollTo(0, 0);
}
