// Função para adicionar evento de clique em botões
function addClickEvent(selector, url) {
  // Busca o elemento com o seletor especificado
  var element = document.querySelector(selector);
  if (element) {
    // Adiciona um evento de clique ao elemento
    element.addEventListener("click", function () {
      // Redireciona para a URL especificada
      window.location.href = url;
    });
  }
}

// Adicionando eventos aos botões
addClickEvent(".boto-produto", "../pagina_produtos/index.html");
addClickEvent(".boto-funcionalidades", "../pagina_funcionalidades/index.html");
addClickEvent(".boto-assinaturas", "../pagina_assinaturas/index.html");
addClickEvent(".boto-contatos", "../pagina_contatos/index.html");
addClickEvent(".boto-embreve", "../pagina_em_breve/index.html");
addClickEvent(".boto-decadastro", "../pagina_cadastro/index.html");
addClickEvent(".text-wrapper-6", "../pagina_inicial/index.html"); // Texto "xNeedWare"
addClickEvent(".avatar", "../pagina_login/login.html"); // Ícone de avatar (login)
addClickEvent(".text-wrapper-2", "../pagina_produtos/index.html"); // Texto "xNeedWare"
addClickEvent(".botosaiba-mais", "../pagina_funcionalidades/index.html");

/*
 * typingEffect()
 * It types an array of texts in a random order. I like random stuff
 */
function typingEffect() {
  // Define o array de textos a serem digitados
  const contactTexts = shuffleArray(['Quer me contar algo?😊', 'Pergunte-me qualquer coisa!😄', 'Quer falar sobre uma ideia?', 'Vamos fazer algo juntos!🤗', 'Precisa de ajuda em algo?👍']);

  
  // Busca o elemento com a classe "typedtext"
  const typedtext = document.getElementsByClassName("textoDigitado")[0];
  
  // Define as variáveis de controle
  let removing = false;
  let idx = char = 0;

  // Define o intervalo de tempo para a animação
  setInterval(() => {
    // Se o texto ainda não foi completamente digitado
    if (char < contactTexts[idx].length) {
      // Adiciona o próximo caractere ao texto
      typedtext.innerHTML += contactTexts[idx][char];
    }

    // Se o texto foi completamente digitado e o tempo de espera foi alcançado
    if (char == contactTexts[idx].length + 15) {
      // Inicia a remoção dos caracteres
      removing = true;
    }

    // Se a remoção dos caracteres foi iniciada
    if (removing) {
      // Remove o último caractere do texto
      typedtext.innerHTML = typedtext.innerHTML.substring(0, typedtext.innerHTML.length - 1);
    }

    // Avança para o próximo caractere
    char++;

    // Se o texto foi completamente removido
    if (typedtext.innerHTML.length === 0) {
      // Se o array de textos foi completamente percorrido
      if (idx === contactTexts.length - 1) {
        // Reinicia o índice
        idx = 0
      } else {
        // Avança para o próximo texto
        idx++;
      }

      // Reinicia as variáveis de controle
      char = 0;
      removing = false;
    }

  }, 90); // Velocidade da animação (150ms)
}

// Chama a função typingEffect
typingEffect();

// Função para embaralhar o array de textos
function shuffleArray(array) {
  // Define as variáveis de controle
  let currentIndex = array.length,
      temporaryValue, randomIndex;

  // Enquanto houver elementos a serem embaralhados
  while (0 !== currentIndex) {
    // Escolhe um elemento aleatório
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Troca o elemento escolhido com o elemento atual
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  // Retorna o array embaralhado
  return array;
}