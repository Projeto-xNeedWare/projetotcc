// Função para adicionar evento de clique em botões
function addClickEvent(selector, url) {
	var elements = document.querySelectorAll(selector); // Usa querySelectorAll para pegar todos os elementos
	elements.forEach(function (element) {
	  element.addEventListener("click", function () {
		window.location.href = url; // Redireciona para a URL
	  });
	});
  }
  
  // Adicionando eventos aos botões
  addClickEvent(".boto-produto", "../pagina_produtos/index.html");
  addClickEvent(".boto-funcionalidades", "../pagina_sobre-nos/index.html");
  addClickEvent(".boto-assinaturas", "../pagina_assinaturas/index.html");
  addClickEvent(".boto-contatos", "../pagina_cWontatos/index.html");
  addClickEvent(".boto-embreve", "../pagina_em_breve/index.html");
  addClickEvent(".boto-decadastro", "../pagina_cadastro/index.html");
  addClickEvent(".logo-texto", "../pagina_inicial/index.html"); // Texto "xNeedWare"
  addClickEvent(".avatar", "../pagina_login/login.html"); // Ícone de avatar (login)
  addClickEvent(".text-wrapper-2", "../pagina_produtos/index.html"); // Texto "xNeedWare"
  addClickEvent(".botao-2", "../pagina_em_breve/index.html");
  addClickEvent(".btn-compra", "../pagina_em_breve/index.html");
  
  
  // Aplique o evento de clique em todos os botões de compra
  addClickEvent(".botao-comprar", "../pagina_pagamento/index.html");


// Mobile first js


// Controle do Menu Mobile




  