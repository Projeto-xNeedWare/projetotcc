document.addEventListener('DOMContentLoaded', () => {
  const botao = document.getElementById('btnEntrarConta'); //Pega o botão no html.
  if (!botao) return;

  botao.addEventListener('click', async () => {
    try {
      const resposta = await fetch('/usuario-logado', { //Manda uma requisição get para o backend.
        method: 'GET',
        credentials: 'include' // Pede os dados desse usuário
      });

      if (resposta.ok) { //Se resposta for ok, ele vai ser redireciona para as informações dele.
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/login';//Se não for, vai ser para o login de novo.
      }
    } catch (err) { //Se der erro, vai informar ao usuário.
      console.error('Erro ao verificar sessão:', err);
      window.location.href = '/login';
    }
  });
});
