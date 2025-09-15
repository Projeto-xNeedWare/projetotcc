<?php
// Conexão com banco de dados (MySQLi orientado a objeto)
$servername = "127.0.0.1"; // ou o host da sua hospedagem
$username   = "root";
$password   = "123@abc";
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
    echo "<script>alert('Preencha todos os campos!'); window.location.href='../cadastro/index.html';</script>";
    exit;
}

if ($senha !== $confirma) {
    echo "<script>alert('As senhas não coincidem!'); window.location.href='../cadastro/index.html';</script>";
    exit;
}

// Verifica se já existe o e-mail cadastrado
$sql = "SELECT id FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo "<script>alert('Esse e-mail já está cadastrado!'); window.location.href='../login/index.html';</script>";
    exit;
}

// Criptografa a senha de forma segura
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

// Insere novo usuário
$sql = "INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nome, $sobrenome, $email, $senhaHash);

if ($stmt->execute()) {
    echo "<script>alert('Usuário cadastrado com sucesso!'); window.location.href='../login/index.html';</script>";
} else {
    echo "<script>alert('Erro ao cadastrar usuário.'); window.location.href='../cadastro/index.html';</script>";
}

$stmt->close();
$conn->close();

print_r($_POST);
?>
