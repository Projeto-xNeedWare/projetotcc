// Script para controlar o menu hambúrguer
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    
    // Função para alternar a visibilidade do menu
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        
        // Opcional: Alternar o ícone entre hambúrguer e X
        const icon = mobileMenuBtn.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fechar o menu ao clicar em um link (opcional)
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            
            // Restaurar o ícone para hambúrguer
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Fechar o menu ao redimensionar para desktop (opcional)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('active');
            
            // Restaurar o ícone para hambúrguer
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});