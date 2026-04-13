// --- NAVEGAÇÃO ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) target.classList.add('active');
    window.scrollTo(0, 0);
}

// --- ATUALIZAR BUDGET ---
function updateBudget(val) {
    const display = document.getElementById('budget-display');
    if (display) display.innerText = `€${val}`;
}

// --- PESQUISA PRINCIPAL ---
function executeSearch() {
    const dest = document.getElementById('dest-input').value;
    const budget = document.getElementById('budget-range').value;

    if (!dest) {
        alert("🌍 Please enter a destination!");
        return;
    }

    // Estética: Muda para a página de resultados e simula análise
    showPage('results');
    const title = document.getElementById('results-title');
    title.innerHTML = `🔎 AI is finding trips to ${dest} under €${budget}...`;

    // Como o Booking não aceitou, vamos usar o Trip.com (que aprova rápido no Travelpayouts)
    // O link abre com o destino que o utilizador escolheu
    setTimeout(() => {
        const url = `https://www.trip.com/search/keyword?keyword=${encodeURIComponent(dest)}&allianceid=3232145&sid=123456`;
        window.open(url, '_blank');
        title.innerHTML = `✅ Results found for ${dest}!`;
    }, 2000);
}

// --- BOTÕES DOS CARDS (Lisboa, Roma, etc) ---
function openAffiliate(city) {
    const url = `https://www.trip.com/search/keyword?keyword=${encodeURIComponent(city)}&allianceid=3232145&sid=123456`;
    window.open(url, '_blank');
}

// --- IA FUNCIONAL ---
function askAI() {
    const input = document.getElementById('ai-input-text').value;
    
    if (!input) {
        alert("🤖 Tell me where you want to go!");
        return;
    }

    alert("🤖 One moment... I'm searching for the best prices for: " + input);

    setTimeout(() => {
        const url = `https://www.trip.com/search/keyword?keyword=${encodeURIComponent(input)}&allianceid=3232145&sid=123456`;
        window.open(url, '_blank');
    }, 1000);
}
