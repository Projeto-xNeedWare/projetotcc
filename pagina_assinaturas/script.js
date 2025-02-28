function addClickEvent(selector, url) {
    var element = document.querySelector(selector);
    if (element) {
        element.addEventListener("click", function () {
            window.location.href = url;
        });
    }
}

// Adicionando eventos aos botões de compra
addClickEvent("#frameContainer", "../pagina_pagamento/index.html");
addClickEvent("#frameContainer1", "../pagina_pagamento/index.html");
addClickEvent("#frameContainer2", "../pagina_pagamento/index.html");

// Adicionando eventos aos botões do cabeçalho
addClickEvent("#botoProdutoContainer", "../pagina_produtos/index.html");
addClickEvent("#botoFuncionalidadesContainer", "../pagina_funcionalidades/index.html");
addClickEvent("#botoAssinaturasContainer", "../pagina_assinaturas/index.html");
addClickEvent("#botoContatosContainer", "../pagina_contatos/index.html");
addClickEvent("#botoEmBreveContainer", "../pagina_em_breve/embreve.html");
addClickEvent("#botoDecadastroContainer", "../pagina_cadastro/index.html");
addClickEvent("#xNeedWareText", "../pagina_inicial/index.html"); // Texto "xNeedWare"
addClickEvent("#avatar", "../pagina_login/login.html"); // Ícone de avatar (login)