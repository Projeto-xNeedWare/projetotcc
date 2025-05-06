function verificarSessao() {
    fetch('http://localhost:3000/verificar-sessao')
      .then(response => response.json())
      .then(data => {
        if (data.autenticado) {
          // Se o usuário estiver autenticado, redireciona para o dashboard
          window.location.href = '/dashboard'; // Redireciona para a rota do dashboard no servidor
        } else {
          // Se não estiver autenticado, redireciona para a página de login
          window.location.href = '/login.html'; // Redireciona para a página de login
        }
      })
      .catch(error => {
        console.error('Erro ao verificar a sessão:', error);
        // Caso ocorra algum erro na verificação da sessão
        window.location.href = '/login.html'; // Redireciona para o login
      });
  }