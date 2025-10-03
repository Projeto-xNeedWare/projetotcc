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
// Login via fetch para backend
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;
  const msg = document.getElementById("msg"); // assumindo que existe um elemento para mensagens

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });
    const data = await res.text();
    
    if (msg) {
      msg.textContent = data;
    }

    if (data.includes("Bem-vindo") || res.ok) {
      // Opção 1: Redirecionar para a última página acessada
      const ultimaPagina = sessionStorage.getItem('paginaAnterior') || '/';
      window.location.href = ultimaPagina;
      
      // Opção 2: Redirecionar baseado no tipo de usuário ou contexto
      // window.location.href = determinarPaginaDestino();
      
      // Opção 3: Redirecionar para página específica
      // window.location.href = "/conta";
    }
  } catch (err) {
    if (msg) {
      msg.style.color = "red";
      msg.textContent = "❌ Erro ao conectar ao servidor.";
    }
    console.error("Erro no login:", err);
  }
});

// Função para salvar a página atual antes do login
function salvarPaginaAtual() {
  // Não salva se já estiver na página de login
  if (!window.location.pathname.includes('/login')) {
    sessionStorage.setItem('paginaAnterior', window.location.href);
  }
}

// Função para determinar página de destino baseada no contexto
function determinarPaginaDestino() {
  // Verifica se veio de uma página específica
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get('redirect');
  
  if (redirect) {
    return redirect;
  }
  
  // Verifica se tinha algo no carrinho
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho.length > 0) {
    return "/carrinho";
  }
  
}

// Chama esta função quando o usuário clicar em "Login" em qualquer página
// Exemplo no header:
function prepararLogin() {
  salvarPaginaAtual();
  window.location.href = "/login";
}

// Logout
const logoutLink = document.getElementById("logoutLink");
if (logoutLink) {
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("/logout").then(() => window.location.href = "/login");
  });
}
