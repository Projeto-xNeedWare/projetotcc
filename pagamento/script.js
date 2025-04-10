// A pessoa precisa chegar até esta para voltar para a anterior
var botaoFecharicon = document.getElementById("botaoFecharicon");
if (botaoFecharicon) {
    botaoFecharicon.addEventListener("click", function () {
        window.history.back(); // Volta para a página anterior no histórico do navegador
    });
}