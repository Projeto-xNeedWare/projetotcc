// Seleciona o formulário de cadastro pelo ID e adiciona um ouvinte de evento para quando for enviado
document.getElementById('form-cadastro').addEventListener('submit', async function(e) {
    // Impede que a página recarregue ao enviar o formulário
    e.preventDefault();

    // Coleta os dados dos campos do formulário
    const nome = document.getElementById('first-name').value; // Nome
    const sobrenome = document.getElementById('last-name').value; // Sobrenome
    const email = document.getElementById('email').value; // Email
    const senha = document.getElementById('password').value; // Senha
    const confirmSenha = document.getElementById('confirm-password').value; // Confirmação da senha

    try {
        // Envia uma requisição POST para a rota /cadastro no backend
        const response = await fetch('http://localhost:3000/cadastro', {
            method: 'POST', // Método HTTP POST
            headers: {
                'Content-Type': 'application/json' // Informa que o conteúdo é JSON
            },
            body: JSON.stringify({ nome, sobrenome, email, senha, confirmSenha }) // Dados do formulário convertidos para JSON
        });

        // Aguarda a resposta do servidor convertida em JSON
        const result = await response.json();

        // Se o status da resposta for OK (201), cadastro foi bem-sucedido
        if (response.ok) {
            alert('Cadastro realizado com sucesso!'); // Mostra um alerta de sucesso
            window.location.href = '../pagina_inicial/index.html'; // Redireciona para a página inicial
            alert("Seja Bem-Vindo, " + nome); // Dá as boas-vindas ao usuário
        } else {
            // Caso contrário, mostra um alerta com a mensagem de erro retornada
            alert(result.message);
        }
    } catch (erro) {
        // Se acontecer algum erro na comunicação com o servidor, exibe no console
        console.log(erro); 
    }
});
