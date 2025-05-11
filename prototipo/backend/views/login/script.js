const form = document.getElementById('loginForm');
const mensagem = document.getElementById('mensagem');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    try {
        const resposta = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha: password }) // <-- nome correto pro back
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            mensagem.textContent = dados.sucesso || 'Login realizado com sucesso!';
            mensagem.style.color = "green";
            setTimeout(() => {
                window.location.href = '/conta-usuario'; // <-- rota corrigida
            }, 1000);
        } else {
            mensagem.textContent = dados.erro || 'Erro ao fazer login';
            mensagem.style.color = "red";
        }
    } catch (erro) {
        mensagem.textContent = "Erro ao conectar com servidor";
        mensagem.style.color = "red";
    }
});
