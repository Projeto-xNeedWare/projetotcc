    const form = document.getElementById('loginForm')
    const mensagem = document.getElementById('mensagem')

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = form.email.value;
        const password = form.password.value;

    try {
        const resposta = await fetch ('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const dados = await resposta.json();
        if (resposta.ok) {
            mensagem.textContent = dados.message;
            mensagem.style.color = "green"
            window.location.href = '../pagina_inicial/index.html'
        } else {
            mensagem.textContent = dados.message;
            mensagem.style.color = "red"
        }
        } catch (erro) {
        mensagem.textContent = "Erro ao conectar com servidor"
        mensagem.style.color = "red"
        }
    });
