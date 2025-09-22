<?php
session_start();
$usuario_id = $_SESSION['usuario'] ?? null;
$produto = $_POST['produto'] ?? '';
$valor = $_POST['valor'] ?? '';

if ($usuario_id && $produto && $valor) {
    $conn = new mysqli('127.0.0.1', 'root', '', 'xneedware');
    if (!$conn->connect_error) {
        $sql = "INSERT INTO historico_compras (usuario_id, produto, valor) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('isd', $usuario_id, $produto, $valor);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }
}
?>