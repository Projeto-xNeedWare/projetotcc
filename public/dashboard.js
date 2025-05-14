const nomeSpan = document.getElementById('nomeUsuario');

const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('phone');
const cpfField = document.getElementById('cpf');
const addressField = document.getElementById('address');
const cityField = document.getElementById('city');
const stateField = document.getElementById('state');
const zipField = document.getElementById('zip');

fetch('/usuario-logado')
  .then(res => {
    if (!res.ok) throw new Error('Usuário não autenticado');
    return res.json();
  })
  .then(usuario => {
    nomeSpan.textContent = usuario.nome;

    nameField.value = usuario.nome;
    emailField.value = usuario.email;
    phoneField.value = usuario.telefone || '';
    cpfField.value = usuario.cpf || '';
    addressField.value = usuario.endereco || '';
    cityField.value = usuario.cidade || '';
    stateField.value = usuario.estado || '';
    zipField.value = usuario.cep || '';
  })
  .catch(() => {
    window.location.href = '/login';
  });

const saveButton = document.querySelector('.form-actions button');

saveButton.addEventListener('click', () => {
  const dadosAtualizados = {
    nome: nameField.value,
    email: emailField.value,
    telefone: phoneField.value,
    cpf: cpfField.value,
    endereco: addressField.value,
    cidade: cityField.value,
    estado: stateField.value,
    cep: zipField.value,
  };

  fetch('/atualizar-dados', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosAtualizados),
  })
    .then(res => res.json())
    .then(data => {
      alert(data.sucesso || data.erro);
      if (data.sucesso) {
        nomeSpan.textContent = dadosAtualizados.nome;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Erro ao atualizar os dados.');
    });
});
