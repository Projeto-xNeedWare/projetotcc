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

// =============================================
// SISTEMA CORRIGIDO DE REDIRECIONAMENTO PÓS-LOGIN
// =============================================

// 1. Salvar a página atual APENAS se NÃO for página de login/cadastro
function salvarPaginaAtual() {
    const paginaAtual = window.location.href;
    const paginasIgnorar = ['/login', '/registro', '/cadastro', '/auth'];
    
    // Verifica se NÃO é uma página de login/cadastro
    const deveIgnorar = paginasIgnorar.some(pagina => paginaAtual.includes(pagina));
    
    if (!deveIgnorar) {
        localStorage.setItem('paginaAnterior', paginaAtual);
        console.log('📌 Página salva:', paginaAtual);
    } else {
        console.log('🚫 Página ignorada (login/cadastro):', paginaAtual);
    }
}

// 2. Função para redirecionar após login bem-sucedido
function redirecionarAposLogin() {
    const ultimaPagina = localStorage.getItem('paginaAnterior');
    console.log('🔁 Tentando redirecionar para:', ultimaPagina);
    
    if (ultimaPagina && !ultimaPagina.includes('/login')) {
        window.location.href = ultimaPagina;
    } else {
        // Se não tem página salva ou é página de login, vai para home
        window.location.href = '/';
    }
}

// 3. Login via fetch para backend
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginSenha").value;
    const msg = document.getElementById("msg");

    // Mostrar loading
    if (msg) {
        msg.style.color = "blue";
        msg.textContent = "⏳ Entrando...";
    }

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

        if (data.includes("Bem-vindo") || data.includes("Sucesso") || res.ok) {
            if (msg) {
                msg.style.color = "green";
                msg.textContent = "✅ Login realizado! Redirecionando...";
            }
            
            // Redirecionar após 1.5 segundos
            setTimeout(() => {
                redirecionarAposLogin();
            }, 1500);
            
        } else {
            // Login falhou
            if (msg) {
                msg.style.color = "red";
                msg.textContent = data || "❌ Erro no login";
            }
        }
    } catch (err) {
        if (msg) {
            msg.style.color = "red";
            msg.textContent = "❌ Erro ao conectar ao servidor.";
        }
        console.error("Erro no login:", err);
    }
});

// 4. Inicialização do sistema - SALVAR APENAS SE NÃO FOR PÁGINA DE LOGIN
document.addEventListener('DOMContentLoaded', function() {
    // Salvar página atual APENAS se não for login/cadastro
    if (!window.location.href.includes('/login') && !window.location.href.includes('/cadastro')) {
        salvarPaginaAtual();
    }
    
    // Verificar parâmetros da URL para abrir cadastro automaticamente
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    
    // Se tiver action=register ou form=register, mostra cadastro
    if (action === 'register' || urlParams.get('form') === 'register') {
        mostrarCadastro();
    }
    
    console.log('🔄 Sistema de redirecionamento ativo');
    console.log('📋 Última página salva:', localStorage.getItem('paginaAnterior'));
    console.log('📍 Página atual:', window.location.href);
});

// 5. Event listeners adicionais para salvar navegação - APENAS SE NÃO FOR LOGIN
window.addEventListener('beforeunload', function() {
    if (!window.location.href.includes('/login') && !window.location.href.includes('/cadastro')) {
        salvarPaginaAtual();
    }
});

document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href && !link.href.includes('/login') && !link.href.includes('/cadastro')) {
        setTimeout(salvarPaginaAtual, 50);
    }
});

// 6. Função para preparar login (usar nos links de login do site) - ESSA É A CHAVE!
function prepararLogin() {
    // Salva a página atual ANTES de ir para o login
    salvarPaginaAtual();
    window.location.href = "/login";
}

// 7. Logout
const logoutLink = document.getElementById("logoutLink");
if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        fetch("/logout").then(() => window.location.href = "/login");
    });
}