<?php
session_start();
$email = $_POST['email'] ?? '';
$senha = $_POST['password'] ?? '';

// Conexão com banco
$conn = new mysqli('127.0.0.1', 'root', '', 'xneedware');

if ($conn->connect_error) {
    die('Erro de conexão');
}

// Consulta usuário
$sql = "SELECT * FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    if (password_verify($senha, $user['senha'])) {
        $_SESSION['usuario'] = $user['id'];
        header('Location: /projetotcc/views/pagina_inicial/index.php');
        exit;
    } else {
        echo "<script>alert('Senha incorreta!'); window.location.href='/projetotcc/views/login/index.html';</script>";
    }
} else {
    echo "<script>alert('Usuário não encontrado!'); window.location.href='/projetotcc/views/login/index.html';</script>";
}
?>