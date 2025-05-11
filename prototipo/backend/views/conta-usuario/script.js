// Seleciona o elemento onde o nome do usuário será exibido
const nomeSpan = document.getElementById('nomeUsuario');

// Seleciona os campos do formulário
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('phone');
const cpfField = document.getElementById('cpf');
const addressField = document.getElementById('address');
const cityField = document.getElementById('city');
const stateField = document.getElementById('state');
const zipField = document.getElementById('zip');

// Função para buscar dados do usuário logado
fetch('/usuario-logado')
  .then(res => {
    if (!res.ok) throw new Error('Usuário não autenticado');
    return res.json();
  })
  .then(usuario => {
    // Exibe o nome do usuário no topo da página
    nomeSpan.textContent = usuario.nome;

    // Preenche os campos do formulário com as informações do usuário
    nameField.value = usuario.nome;
    emailField.value = usuario.email;
    phoneField.value = usuario.telefone || '';  // Caso o telefone não esteja definido, deixa em branco
    cpfField.value = usuario.cpf || '';
    addressField.value = usuario.endereco || '';
    cityField.value = usuario.cidade || '';
    stateField.value = usuario.estado || '';
    zipField.value = usuario.cep || '';
  })
  .catch(() => {
    // Se o usuário não estiver autenticado, redireciona para o login
    window.location.href = '/login';
  });

// Seleciona o botão de salvar alterações
const saveButton = document.querySelector('.form-actions button');

// Função para salvar as alterações
saveButton.addEventListener('click', () => {
  // Coleta os valores dos campos
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

  // Faz a requisição para atualizar os dados do usuário
  fetch('/atualizar-dados', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosAtualizados),
  })
    .then((res) => res.json())
    .then((data) => {
      // Exibe a mensagem de sucesso
      alert(data.sucesso || data.erro);
      if (data.sucesso) {
        // Atualiza o nome exibido no topo da página
        nomeSpan.textContent = dadosAtualizados.nome;
      }
    })
    .catch((err) => {
      console.error(err);
      alert('Erro ao atualizar os dados. Tente novamente.');
    });
});
