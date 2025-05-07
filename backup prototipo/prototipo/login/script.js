// Seleciona o formulário de login pelo ID
const form = document.getElementById('loginForm');

// Seleciona a div ou span onde será exibida a mensagem de erro ou sucesso
const mensagem = document.getElementById('mensagem');

// Adiciona um ouvinte de evento para o envio do formulário
form.addEventListener('submit', async (e) => {
    // Impede o comportamento padrão do formulário (recarregar a página)
    e.preventDefault();

    // Pega o valor do campo de email no formulário
    const email = form.email.value;

    // Pega o valor do campo de senha no formulário
    const password = form.password.value;

    try {
        // Faz uma requisição POST para o servidor na rota /login
        const resposta = await fetch('http://localhost:3000/login', {
            method: 'POST', // Método HTTP POST
            headers: {
                'Content-Type': 'application/json' // Informa que está enviando JSON
            },
            body: JSON.stringify({ email, password }) // Converte os dados para JSON
        });

        // Espera a resposta da API em formato JSON
        const dados = await resposta.json();

        // Se o status da resposta for OK (200), login foi bem-sucedido
        if (resposta.ok) {
            mensagem.textContent = dados.message; // Mostra a mensagem de sucesso
            mensagem.style.color = "green"; // Muda a cor da mensagem para verde
            window.location.href = '../pagina_inicial/index.html'; // Redireciona para a página inicial
        } else {
            // Se não for OK, mostra a mensagem de erro
            mensagem.textContent = dados.message;
            mensagem.style.color = "red"; // Muda a cor para vermelho
        }
    } catch (erro) {
        // Se ocorrer algum erro na requisição, mostra mensagem genérica
        mensagem.textContent = "Erro ao conectar com servidor";
        mensagem.style.color = "red";
    }
});

