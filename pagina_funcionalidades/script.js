function addClickEvent(selector, url) {
    var element = document.querySelector(selector);
    if (element) {
        element.addEventListener("click", function () {
            window.location.href = url;
        });
    }
}

function addBackEvent(selector) {
    var element = document.querySelector(selector);
    if (element) {
        element.addEventListener("click", function () {
            window.history.back();
        });
    }
}

// Adicionando eventos aos botões do cabeçalho
addClickEvent("#botoProdutoContainer", "../pagina_produtos/index.html");
addClickEvent("#botoFuncionalidadesContainer", "index.html");
addClickEvent("#botoContatosContainer", "../pagina_contatos/index.html");
addClickEvent("#botoAssinaturasContainer", "../pagina_assinaturas/index.html");
addClickEvent("#botoDecadastroContainer", "../pagina_cadastro/index.html");
addClickEvent("#xNeedWareText", "../pagina_inicial/index.html");
addClickEvent("#avatar", "../pagina_login/login.html");
addClickEvent("#botoEmBreveContainer", "../pagina_em_breve/embreve.html");

// Adicionando evento para botão de voltar
addBackEvent("#lineRoundedCloseIcon");

// Exemplo de botão de compra (caso precise adicionar funcionalidade depois)
var frameContainer = document.querySelector("#frameContainer");
if (frameContainer) {
    frameContainer.addEventListener("click", function () {
        // Add your code here
    });
}