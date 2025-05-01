<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Resultado</h1>
    </header>

    <main>
        <?php
            $nome = $_GET["nome"]; // $_REQUEST -> Junção de $_GET, $_POST e $_COOKIES
            $sobrenome = $_GET["sobrenome"];
            $email = $_GET["email"];
            $senha = $_GET["senha"];
            echo "<p> Cadastrado com sucesso!! Seja bem-vindo $nome $sobrenome </p>, seu email é $email";
            
        ?>
    </main>
</body>
</html>