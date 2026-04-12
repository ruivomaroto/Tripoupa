// Garante que as funções estão disponíveis assim que o site carrega
window.showPage = function(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) target.classList.add('active');
    window.scrollTo(0, 0);
};

window.askAI = function() {
    const inputField = document.getElementById('ai-input');
    const msg = inputField ? inputField.value : "";

    if (!msg || msg.trim() === "") {
        alert("🤖 Olá! Escreve um destino para eu te ajudar.");
        return;
    }

    alert("🤖 A analisar as melhores ofertas para: " + msg);

    // Redireciona para o Booking com o teu AID de teste
    const url = "https://www.booking.com/searchresults.html?ss=" + encodeURIComponent(msg) + "&aid=678910";
    
    setTimeout(() => {
        window.open(url, '_blank');
    }, 500);
};

window.executeSearch = function() {
    const dest = document.getElementById('dest-input').value;
    if (!dest) {
        alert("🌍 Indica um destino primeiro!");
        return;
    }

    showPage('results');
    const title = document.getElementById('results-title');
    if (title) title.innerHTML = "🔎 Tripoupa AI a pesquisar " + dest + "...";

    setTimeout(() => {
        const url = "https://www.booking.com/searchresults.html?ss=" + encodeURIComponent(dest) + "&aid=678910";
        window.open(url, '_blank');
    }, 2000);
};

window.openAffiliate = function(city) {
    const url = "https://www.booking.com/searchresults.html?ss=" + encodeURIComponent(city) + "&aid=678910";
    window.open(url, '_blank');
};
