// Menu Hamburguer
const menuButton = document.querySelector('.menu-hamburguer');
const menu = document.querySelector('.menu');

menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    menu.classList.toggle('active');
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
        menu.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
    }
});