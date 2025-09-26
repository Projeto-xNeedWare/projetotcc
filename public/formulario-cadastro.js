function cadastrarUsuario(email, senha) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (usuarios.find(u => u.email === email)) {
    alert('Email já cadastrado!');
    return false;
  }
  usuarios.push({ email, senha });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert('Cadastro realizado!');
  window.location.href = '../../views/login/index.html';
}

document.getElementById('cadastroForm').onsubmit = function(e) {
  e.preventDefault();
  cadastrarUsuario(
    document.getElementById('cadastroEmail').value,
    document.getElementById('cadastroSenha').value
  );
};