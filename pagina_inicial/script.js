document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-hamburguer');
    const menu = document.querySelector('.menu-links');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('aberto');
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
            menu.classList.remove('aberto');
        }
    });
});