// header-user.js
document.addEventListener("DOMContentLoaded", () => {
  const usuarioArea = document.getElementById("usuarioArea");
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario) {
    // Usuário logado
    usuarioArea.innerHTML = `
      <div class="usuario-menu" style="position: relative; display: inline-block;">
        <a title="Acesse sua conta" href="/login" style="margin-left: 20px; font-size: 1.2rem;">
          <i class="fa-thin fa-circle-user"></i> Olá, ${usuario.nome}
        </a>
        <div class="usuario-dropdown" style="display: none; padding: 10px; width: 150px; position: absolute; background: #000000ff; border: 1px solid #ccc; right: 0; z-index: 10;">
          <a href="/conta">Minha Conta</a><br>
          <a href="/logout" id="logoutLink">Sair</a>
        </div>
      </div>
    `;

    const menu = usuarioArea.querySelector(".usuario-menu");
    const dropdown = usuarioArea.querySelector(".usuario-dropdown");

    menu.addEventListener("mouseover", () => {
      dropdown.style.display = "block";
    });
    menu.addEventListener("mouseout", () => {
      dropdown.style.display = "none";
    });

    // Logout
    document.getElementById("logoutLink").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuario");
      localStorage.removeItem("logado");
      window.location.href = "/views/login-cadastro/index.html";
    });
  } else {
    // Usuário não logado
    usuarioArea.innerHTML = `
      <a title="Entre na sua conta" href="/login">
        <i class="fa-thin fa-circle-user" style="margin-left: 20px; font-size: 2rem;"></i>
      </a>
    `;
  }
});
