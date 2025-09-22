<?php
session_start();
session_unset();
session_destroy();

// Remove cookie se existir
setcookie('nome', '', time() - 3600, '/');

// Redireciona para a página de login
header('Location: ../views/login/index.html');
exit;
?>