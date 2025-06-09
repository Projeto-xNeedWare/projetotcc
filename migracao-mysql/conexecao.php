<?php
// conexao.php - Arquivo para conexão com o banco de dados

// Configurações do banco de dados
$host = 'localhost';     // Geralmente localhost ou 127.0.0.1
$dbname = 'projetotcc';   // Nome do seu banco de dados
$usuario = 'root';       // Nome de usuário do MySQL
$senha = '';             // Senha do MySQL (vazia por padrão em instalações locais)

try {
    // Criando a conexão usando PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $usuario, $senha);
    
    // Configurar o PDO para lançar exceções em caso de erros
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Opcional: Configurar para retornar resultados como objetos
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    
    // echo "Conexão com o banco de dados estabelecida com sucesso!";
    
} catch(PDOException $e) {
    // Em caso de erro na conexão
    die("ERRO DE CONEXÃO: " . $e->getMessage());
}
?>