function addClickEvent(selector, url) {
    var element = document.querySelector(selector);
    if (element) {
        element.addEventListener("click", function () {
            window.location.href = url;
        });
    }
}

// Adicionando eventos aos botões
addClickEvent("#botoProdutoContainer", "../pagina_produtos/index.html");
addClickEvent("#botoFuncionalidadesContainer", "../pagina_funcionalidades/index.html");
addClickEvent("#botoAssinaturasContainer", "../pagina_assinaturas/index.html");
addClickEvent("#botoContatosContainer", "../Paginas_Contatos/index.html");
addClickEvent("#botoEmBreveContainer", "../pagina_em_breve/embreve.html");
addClickEvent("#botoDecadastroContainer", "../pagina_cadastro/index.html");
addClickEvent("#xNeedWareText", "../pagina_inicial/index.html"); // Texto "xNeedWare"
addClickEvent("#avatar", "../pagina_login/login.html"); // Ícone de avatar (login)
