<?php
$nome_usuario = $_SESSION['usuario_nome'] ?? $_COOKIE['nome'] ?? 'Usuário';
echo "Olá, " . htmlspecialchars($nome_usuario) . "! Bem-vindo ao seu painel de usuário.";
?>