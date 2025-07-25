<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';

try {
    header('Content-Type: application/json');

    // Captura os dados do formulário
    $nome         = $_POST['name']         ?? '';
    $email        = $_POST['email']        ?? '';
    $telefone     = $_POST['telefone']     ?? '';
    $nomeempresa  = $_POST['nomeempresa']  ?? '';
    $cnpj         = $_POST['cnpj']         ?? '';
    $mensagem     = $_POST['message']      ?? '';

    if (!$nome || !$telefone || !$email || !$nomeempresa) {
        echo json_encode(['success' => false, 'error' => 'Preencha todos os campos obrigatórios.']);
        exit;
    }

    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'gabrielmloquetti@gmail.com';
    $mail->Password   = 'qothiwmpuwscjuta'; // Senha de app
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('gabrielmloquetti@gmail.com', 'Contato xNeedWare');
    $mail->addAddress($email, $nome); // Cliente
    $mail->addAddress('gabrielmloquetti@gmail.com', 'CEO xNeedWare');
    $mail->addAddress('matcarvalholol87@gmail.com', 'Gerente de Projetos');
    $mail->addAddress('bruno.correr.coa@gmail.com', 'Desenvolvedor Full Stack');
    $mail->addAddress('felipeloteriodev@gmail.com', 'Analista de Sistemas');

    $mail->isHTML(true);
    $mail->Subject = '📥 Novo Lead - xNeedWare';
    $mail->Body = "
        <h2>📋 Dados do Cliente</h2>
        <p><strong>👤 Nome:</strong> {$nome}</p>
        <p><strong>✉️ E-mail:</strong> {$email}</p>
        <p><strong>📞 Telefone:</strong> {$telefone}</p>
        <p><strong>🏢 Empresa:</strong> {$nomeempresa}</p>
        <p><strong>🧾 CNPJ:</strong> " . ($cnpj ?: 'Não informado') . "</p>
        <p><strong>📄 Mensagem:</strong><br>{$mensagem}</p>
    ";

    if ($mail->send()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Erro ao enviar: ' . $mail->ErrorInfo]);
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Erro: ' . $e->getMessage()]);
}
?>