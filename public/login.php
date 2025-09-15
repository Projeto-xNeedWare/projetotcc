<?php
session_start();

// Conexão com banco de dados
$servername = "127.0.0.1"; // ou o host da sua hospedagem
$username   = "root";
$password   = "123@abc";
$dbname     = "xneedware";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

// Recebe os dados do formulário
$email = $_POST["email"];
$senha = $_POST["password"];

// Consulta usuário pelo e-mail
$sql = "SELECT id, nome, sobrenome, email, senha FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Verifica senha
    if (password_verify($senha, $user["senha"])) {
        // Login válido → cria sessão
        $_SESSION["usuario_id"]   = $user["id"];
        $_SESSION["usuario_nome"] = $user["nome"];

        // Redireciona para a página inicial/logada
        header("Location: ../pagina_inicial/index.html");
        exit;
    } else {
        echo "<script>alert('Senha incorreta!'); window.location.href='../login/index.html';</script>";
    }
} else {
    echo "<script>alert('E-mail não encontrado!'); window.location.href='../login/index.html';</script>";
}

$stmt->close();
$conn->close();
?>
