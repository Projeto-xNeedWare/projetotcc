

document.getElementById('form-cadastro').addEventListener('submit', async function(e) {
    e.preventDefault(); // Impede o recarregamento da página

    const nome = document.getElementById('first-name').value;
    const sobrenome = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    const confirmSenha = document.getElementById('confirm-password').value;


    try {
    const response = await fetch ('http://localhost:3000/cadastro', {
        method: 'POST',
        headers :{ 'Content-Type': 'application/json' },
        body: JSON.stringify ({nome, sobrenome, email, senha, confirmSenha})
        
    })

    const result = await response.json();

    if (response.ok){
        alert('Cadastro realizado com sucesso!')
        window.location.href = '../pagina_inicial/index.html';
        alert("Seja Bem-Vindo," + nome)
    } else {
        alert(result.message);
    }
} catch (erro) {
    console.log(error)
}
    
    });
