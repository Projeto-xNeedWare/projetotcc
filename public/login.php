<?php
session_start();
$email = $_POST['email'] ?? '';
$senha = $_POST['password'] ?? '';

// Conexão com banco (exemplo)
$conn = new mysqli('localhost', 'usuario', 'senha', 'banco');

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
        header('Location: ../pagina_inicial/index.html');
        exit;
    } else {
        echo "Senha incorreta!";
    }
} else {
    echo "Usuário não encontrado!";
}
?>