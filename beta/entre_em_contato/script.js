// script.js

// ==========================
// MENU HAMBÚRGUER
// ==========================

// Seleciona o botão e o menu
const menuButton = document.querySelector(".menu-hamburguer");
const menu = document.querySelector(".menu");

// Alterna o menu ao clicar no botão
menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", !isExpanded);
  menu.classList.toggle("active");
});

// Fecha o menu ao clicar fora dele
document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !menuButton.contains(e.target)) {
    menu.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

// ==========================
// SCROLL SUAVE PARA ÂNCORAS
// ==========================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const destino = document.querySelector(this.getAttribute("href"));
    if (destino) {
      destino.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// ==========================
// VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// ==========================

const form = document.querySelector(".formulario-contato");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Aqui você pode adicionar validações personalizadas
    // Ex: checar campos específicos, enviar via fetch, etc.

    // Resetar o formulário após envio
    form.reset();

    // Feedback ao usuário
    alert("Mensagem enviada com sucesso!");
  });
}
