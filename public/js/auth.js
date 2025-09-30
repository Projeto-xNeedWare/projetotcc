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

// Simulação de "banco" no localStorage
const msg = document.getElementById("msg");

document.getElementById("cadastroForm").addEventListener("submit", function (e) {
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

  // Salvar no localStorage
  const usuario = { nome, sobrenome, email, senha };
  localStorage.setItem("usuario", JSON.stringify(usuario));

  msg.style.color = "lightgreen";
  msg.textContent = "✅ Conta criada com sucesso! Agora faça login.";

  mostrarLogin();
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (usuario && email === usuario.email && senha === usuario.senha) {
  msg.style.color = "lightgreen";
  msg.textContent = `✅ Bem-vindo, ${usuario.nome}!`;

  // Salvar sessão (opcional)
  localStorage.setItem("logado", "true");

  // Redirecionar após 1s
    setTimeout(() => {
        window.location.href = "/conta";
    }, 1000);
    } else {
    msg.style.color = "red";
    msg.textContent = "❌ Email ou senha inválidos.";
    }

});
