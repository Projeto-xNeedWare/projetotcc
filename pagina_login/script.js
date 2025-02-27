// A pessoa precisar chegar nesta página para ir para a página anterior
var botaoFecharicon = document.getElementById("fechar_icon");
if (lineRoundedCloseIcon) {
    lineRoundedCloseIcon.addEventListener("click", function () {
        window.history.back(); // Volta para a página anterior no histórico do navegador
    });
}