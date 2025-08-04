//Quando a página for carregada, ela irá pegar elementos do hmtl para fazer o controle do menu mobile.
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    
    //Quando o usuário for clicar no elemento, vai ativar uma composição do mainNav
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        
        // Opcional: Alternar o ícone entre hambúrguer e X
        const icon = mobileMenuBtn.querySelector('i');
        //Se tiver o ícone do menu, ele remove, e adiciona o X
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            //Se tiver o X, remove o X e adiciona o do menu
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
   //Quando clica em qualquer link dentro do nav link, o menu é fechado e volta a exibir o ícone do hambúrguer
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
    
    //Se estiver num desktop, irá retirar a opção do menu
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