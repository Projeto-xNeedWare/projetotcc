//Pega elementos do html
const form = document.getElementById('loginForm');
const mensagem = document.getElementById('mensagem');

//Quando o usuário clicar para enviar o formulário
form.addEventListener('submit', async (e) => {
    //Não deixa ser enviado pro nada
    e.preventDefault();
    //Pega os dados do email e senha
    const email = form.email.value;
    const password = form.password.value;

    try {
        //Manda a resposta para o backend
        const resposta = await fetch('http://localhost:3000/login', {
            //Diz o método
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //Transforma em JSON
            body: JSON.stringify({ email, senha: password }) // <-- nome correto pro back
        });

        //Pega a respostas desses mesmos dados
        const dados = await resposta.json();
        //Se a resposta for ok, responde com sucesso
        if (resposta.ok) {
            mensagem.textContent = dados.sucesso || 'Login realizado com sucesso!';
            mensagem.style.color = "green";
            setTimeout(() => {
                window.location.href = '/conta-usuario'; // <-- rota corrigida
            }, 1000);
            //Se for inválido responde com erro
        } else {

            mensagem.textContent = dados.erro || 'Erro ao fazer login';
            mensagem.style.color = "red";
        }
        //Se der erro no server, diz uma mensagem de erro ao usuário.
    } catch (erro) {
        mensagem.textContent = "Erro ao conectar com servidor";
        mensagem.style.color = "red";
    }
});
