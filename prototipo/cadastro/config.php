<?php
// Conexão com o banco
$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "formulario";

$conexao = new mysqli($servidor, $usuario, $senha, $banco);

if ($conexao->query($sql) === TRUE) {
    exit(); // Importante para parar a execução do PHP
} else {
    echo "Erro ao cadastrar: " . $conexao->error;
}


// Pegando os dados do formulário
$nome = $_GET["nome"] ?? '';
$sobrenome = $_GET["sobrenome"] ?? '';
$email = $_GET["email"] ?? '';
$senha = $_GET["senha"] ?? '';

// Validação básica
if ($nome && $sobrenome && $email && $senha) {
    $sql = "INSERT INTO usuarios (nome, sobrenome, email, senha)
            VALUES ('$nome', '$sobrenome', '$email', '$senha')";

    if ($conexao->query($sql) === TRUE) {
        echo "Cadastro realizado com sucesso!";
        header("Location: ../pagina_inicial/index.html");
    } else {
        echo "Erro ao cadastrar: " . $conexao->error;
    }
} else {
    echo "Preencha todos os campos!";
}

$conexao->close();
?>



<!-- <!DOCTYPE html>
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
        
            $nome = $_GET["nome"]; // $_REQUEST -> Junção de $_GET, $_POST e $_COOKIES
            $sobrenome = $_GET["sobrenome"];
            $email = $_GET["email"];
            $senha = $_GET["senha"];
            echo "<p> Cadastrado com sucesso!! Seja bem-vindo $nome $sobrenome </p>, seu email é $email";
            
        ?>//
    </main>
</body>
</html> --!/>