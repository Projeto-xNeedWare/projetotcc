document.addEventListener('DOMContentLoaded', () => {
  const botao = document.getElementById('btnEntrarConta');
  if (!botao) return;

  botao.addEventListener('click', async () => {
    try {
      const resposta = await fetch('/usuario-logado', {
        method: 'GET',
        credentials: 'include' // <-- MUITO IMPORTANTE
      });

      if (resposta.ok) {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/login';
      }
    } catch (err) {
      console.error('Erro ao verificar sessão:', err);
      window.location.href = '/login';
    }
  });
});
