// Função para trocar entre as "páginas" (divs) do site
function showPage(pageId) {
    // Esconder todas as páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Mostrar a página selecionada
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0); // Volta ao topo da página
    }

    // Atualizar a classe ativa no menu de navegação
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));
    const activeNavLink = document.getElementById('nav-' + pageId);
    if (activeNavLink) activeNavLink.classList.add('active');
}

// Atualizar o valor do orçamento no ecrã
function updateBudget(value) {
    document.getElementById('budget-display').innerText = '€' + value;
}

// Mostrar avisos simples (Toasts)
function showToast(message) {
    alert(message); // Por agora um alert, depois podes fazer algo mais bonito
}
