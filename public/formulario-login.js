function loginUsuario(email, senha) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  let usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (usuario) {
    alert('Login realizado!');
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    window.location.href = '../../views/pagina_inicial/index.html';
  } else {
    alert('Email ou senha incorretos!');
  }
}

document.getElementById('loginForm').onsubmit = function(e) {
  e.preventDefault();
  loginUsuario(
    document.getElementById('loginEmail').value,
    document.getElementById('loginSenha').value
  );
};