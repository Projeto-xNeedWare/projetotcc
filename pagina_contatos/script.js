// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Controle do menu mobile
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

    // Suavizar scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Validação de formulário
    const form = document.querySelector('.formulario-contato');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Adicionar validação personalizada aqui
            form.reset();
            alert('Mensagem enviada com sucesso!');
        });
    }
});