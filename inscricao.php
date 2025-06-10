<?php
// inscricao.php
require_once 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'] ?? '';
    
    try {
        $sql = "INSERT INTO inscricoes (nome, email, telefone) VALUES (:nome, :email, :telefone)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':telefone', $telefone);
        $stmt->execute();
        
        echo "<h2>✅ Inscrição realizada com sucesso!</h2>";
        echo "<p>Obrigado, $nome! Em breve você receberá mais informações.</p>";
        echo "<a href='index.html'>← Voltar ao site</a>";
        
    } catch(PDOException $e) {
        echo "<h2>❌ Erro ao processar inscrição</h2>";
        echo "<p>Tente novamente mais tarde.</p>";
        echo "<a href='index.html'>← Voltar ao site</a>";
    }
}
?>