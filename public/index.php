<?php
  // Verifica se existe o cookie de login
    if(isset($_COOKIE["login"])) {
        header("Location: conta-usuario/minha-conta.php");
        exit();
    }
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Index</title>
</head>
<body>
    <h1>Bem-vindo ao site</h1>
    <p><a href="login.html">Fazer Login</a></p>
    <p><a href="cadastro.html">Cadastrar-se</a></p>
</body>
</html>
