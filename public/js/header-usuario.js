// header-user.js
document.addEventListener("DOMContentLoaded", async () => {
  const usuarioArea = document.getElementById("usuarioArea");

  try {
    const res = await fetch("/api/usuario");
    if (!res.ok) throw new Error("Não logado");
    const usuario = await res.json();

    // Usuário logado
    usuarioArea.innerHTML = `
      <div class="usuario-menu" style="position: relative; display: inline-block;">
        <a title="Acesse sua conta" href="/conta" style="margin-left: 20px; font-size: 1.2rem;">
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
    document.getElementById("logoutLink").addEventListener("click", async (e) => {
      e.preventDefault();
      await fetch("/logout");
      window.location.href = "/login";
    });

  } catch (err) {
    // Usuário não logado
    usuarioArea.innerHTML = `
      <a title="Entre na sua conta" href="/login">
        <i class="fa-thin fa-circle-user" style="margin-left: 20px; font-size: 2rem;"></i>
      </a>
    `;
  }
});
