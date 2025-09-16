<?php
// Conexão com banco de dados (MySQLi orientado a objeto)
$servername = "127.0.0.1"; // ou o host da sua hospedagem
$username   = "root";
$password   = "";
$dbname     = "xneedware";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Recebendo dados do formulário
$nome      = $_POST["nome"];
$sobrenome = $_POST["sobrenome"];
$email     = $_POST["email"];
$senha     = $_POST["senha"];
$confirma  = $_POST["confirm-senha"];

// Validações básicas
if (empty($nome) || empty($sobrenome) || empty($email) || empty($senha)) {
echo "<script>alert('Preencha todos os campos!'); window.location.href='/projetotcc/views/cadastro/index.php';</script>";
    exit;
}

if ($senha !== $confirma) {
    echo "<script>alert('As senhas não coincidem!'); window.location.href='/projetotcc/views/cadastro/index.php';</script>";
    exit;
}

// Verifica se já existe o e-mail cadastrado
$sql = "SELECT id FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo "<script>alert('Esse e-mail já está cadastrado!'); window.location.href='../views/login/index.php';</script>";
    exit;
}

// Criptografa a senha de forma segura
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

// Insere novo usuário
$sql = "INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nome, $sobrenome, $email, $senhaHash);

if ($stmt->execute()) {
    session_start();
    $_SESSION['usuario_nome'] = $nome;
    $_SESSION['usuario_email'] = $email;
    echo "<script>alert('Usuário cadastrado com sucesso!'); window.location.href='../views/conta-usuario/minha-conta.php';</script>";
} else {
    echo "<script>alert('Erro ao cadastrar usuário.'); window.location.href='../views/cadastro/index.php';</script>";
}

$stmt->close();
$conn->close();
?>