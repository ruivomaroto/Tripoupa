// Garante que o script corre após o carregamento
window.onload = function() {
    console.log("Tripoupa Engine Started");
};

// 1. Navegação entre páginas
window.showPage = function(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) {
        target.classList.add('active');
    }
    window.scrollTo(0, 0);
};

// 2. Atualizar o Budget
window.updateBudget = function(val) {
    const display = document.getElementById('budget-display');
    if (display) {
        display.innerText = "€" + val;
    }
};

// 3. Pesquisa Principal
window.executeSearch = function() {
    const destination = document.getElementById('dest-input').value;
    const budget = document.getElementById('budget-range').value;

    if (!destination) {
        alert("🌍 Please enter a destination!");
        return;
    }

    showPage('results');
    const titleEl = document.getElementById('results-title');
    if (titleEl) titleEl.innerText = `✈️ Finding the best deals for ${destination} under €${budget}`;

    // Redireciona para o Trip.com (Alternativa ao Booking)
    setTimeout(() => {
        const url = `https://www.trip.com/search/keyword?keyword=${encodeURIComponent(destination)}`;
        window.open(url, '_blank');
    }, 1500);
};

// 4. IA Assistant funcional
window.askAI = function() {
    const aiInput = document.getElementById('ai-input');
    const query = aiInput ? aiInput.value : "";

    if (!query) {
        alert("🤖 Tell me where you want to go!");
        return;
    }

    alert("🤖 Analyzing the best routes and prices for: " + query);

    setTimeout(() => {
        const url = `https://www.trip.com/search/keyword?keyword=${encodeURIComponent(query)}`;
        window.open(url, '_blank');
    }, 1000);
};

// 5. Botões dos cards de Lisboa/Roma
window.openAffiliate = function(city) {
    const url = `https://www.trip.com/search/keyword?keyword=${encodeURIComponent(city)}`;
    window.open(url, '_blank');
};
