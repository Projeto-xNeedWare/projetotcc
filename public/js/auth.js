// Alternar entre Login e Cadastro
function mostrarCadastro() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('cadastroForm').style.display = 'block';
  document.getElementById('form-title').innerText = 'Crie sua conta';
  document.getElementById('form-desc').innerText = 'Preencha os dados abaixo para começar';
  document.getElementById('toggle-link').innerHTML =
    'Já tem uma conta? <a href="#" onclick="mostrarLogin()">Faça login</a>';
}

function mostrarLogin() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('cadastroForm').style.display = 'none';
  document.getElementById('form-title').innerText = 'Entrar na sua conta';
  document.getElementById('form-desc').innerText = 'Faça login para continuar';
  document.getElementById('toggle-link').innerHTML =
    'Não tem uma conta? <a href="#" onclick="mostrarCadastro()">Cadastre-se</a>';
}

const msg = document.getElementById("msg");

// Cadastro via fetch para backend
document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nome = document.getElementById("cadastroNome").value;
  const sobrenome = document.getElementById("cadastroSobrenome").value;
  const email = document.getElementById("cadastroEmail").value;
  const senha = document.getElementById("cadastroSenha").value;
  const senha2 = document.getElementById("cadastroSenha2").value;

  if (senha !== senha2) {
    msg.style.color = "red";
    msg.textContent = "❌ As senhas não coincidem!";
    return;
  }

  try {
    const res = await fetch("/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, sobrenome, email, senha })
    });
    const data = await res.text();
    msg.style.color = "lightgreen";
    msg.textContent = data;
    mostrarLogin();
  } catch (err) {
    msg.style.color = "red";
    msg.textContent = "❌ Erro ao cadastrar!";
  }
});

// Login via fetch para backend
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });
    const data = await res.text();
    msg.textContent = data;

    if (data.includes("Bem-vindo")) {
      setTimeout(() => window.location.href = "/conta", 1000);
    }
  } catch (err) {
    msg.style.color = "red";
    msg.textContent = "❌ Erro ao conectar ao servidor.";
  }
});

// Logout
const logoutLink = document.getElementById("logoutLink");
if (logoutLink) {
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("/logout").then(() => window.location.href = "/login");
  });
}
