const nomeSpan = document.getElementById('nomeUsuario');
//Pega todas as informações wsedrftgyhujikolpç´~[]
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const phoneField = document.getElementById('phone');
const cpfField = document.getElementById('cpf');
const addressField = document.getElementById('address');
const cityField = document.getElementById('city');
const stateField = document.getElementById('state');
const zipField = document.getElementById('zip');

//Faz uma requisição get para esta página
fetch('/usuario-logado')
//Depois da requisição, verifica a resposta, e se der erro, manda ua frase alertando o usuário
  .then(res => {
    if (!res.ok) throw new Error('Usuário não autenticado');
    return res.json();
  })
  //Depois dessa verificação
  .then(usuario => {
    //Exibe o nome do usuário na página
    nomeSpan.textContent = usuario.nome;

    //Pega os dados e impoe eles nas variáveis
    nameField.value = usuario.nome;
    emailField.value = usuario.email;
    phoneField.value = usuario.telefone || '';
    cpfField.value = usuario.cpf || '';
    addressField.value = usuario.endereco || '';
    cityField.value = usuario.cidade || '';
    stateField.value = usuario.estado || '';
    zipField.value = usuario.cep || '';
  })
    .catch(() => {//Capturar algum erro e se der, redirecionar para a página de login
      window.location.href = '/login';
    });

//Pega um botão no html
const saveButton = document.querySelector('.form-actions button');

//Adicionando um evento no botão link
saveButton.addEventListener('click', () => {
  //Recebe um objeto com os dados atualizados, conforme o botão de salvar
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

  //Manda uma resposta para esta página, com os dados atualizados
  fetch('/atualizar-dados', {
    method: 'POST',
    headers: {
     
     'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosAtualizados), //Transforma em JSON
  })
      //Depois de ter ocorrido, converte a resposta para JSON
    .then(res => res.json())
    .then(data => {
      //Mostrar independente se deu errado ou certo
      alert(data.sucesso || data.erro);
      //Se deu certo, exibe o nome atualizado na página
      if (data.sucesso) {
        nomeSpan.textContent = dadosAtualizados.nome;
      }
    })//Mostra pro usuário se deu erro
    .catch(err => {
      console.error(err);
      alert('Erro ao atualizar os dados.');
    });
});
