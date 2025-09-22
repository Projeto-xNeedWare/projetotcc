<?php

$usuario_id = $_SESSION['usuario'] ?? null;

if ($usuario_id) {
    $conn = new mysqli('127.0.0.1', 'root', '', 'xneedware');
    if (!$conn->connect_error) {
        $sql = "SELECT produto, valor, data_compra FROM historico_compras WHERE usuario_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $usuario_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo '<table class="user-info-table">';
            echo '<thead><tr><th>Produto</th><th>Valor</th><th>Data</th></tr></thead><tbody>';
            while ($row = $result->fetch_assoc()) {
                echo '<tr>';
                echo '<td>' . htmlspecialchars($row['produto']) . '</td>';
                echo '<td>R$ ' . number_format($row['valor'], 2, ',', '.') . '</td>';
                echo '<td>' . date('d/m/Y H:i', strtotime($row['data_compra'])) . '</td>';
                echo '</tr>';
            }
            echo '</tbody></table>';
        } else {
            echo '<p>Você ainda não realizou nenhuma compra.</p>';
        }
        $stmt->close();
        $conn->close();
    } else {
        echo '<p>Erro ao conectar ao banco de dados.</p>';
    }
} else {
    echo '<p>Usuário não identificado.</p>';
}
?>