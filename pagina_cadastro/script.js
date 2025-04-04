function verificarSenhasIguais() {
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar_senha").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return false; // Impede o envio do formulário
    }

    return true; // Permite o envio do formulário
}