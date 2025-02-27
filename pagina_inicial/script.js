// Função para adicionar evento de clique em botões
function addClickEvent(selector, url) {
    var element = document.querySelector(selector);
    if (element) {
      element.addEventListener("click", function () {
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