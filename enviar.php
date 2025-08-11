<?php
// este arquivo serve para enviar emails da página de contatos

// ------------------------------------------
// estas informações estão usando as pastas que vem do composer que é o PHPMailer, Exception e SMTP
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';
// ------------------------------------------

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';

try {
    header('Content-Type: application/json');

    // ------------------------------------------
    // coletagem de dados para enviar para o email, estes dados entram no banco de dados MySQL Workbench e enviam
    $nome         = $_POST['name']         ?? '';
    $email        = $_POST['email']        ?? '';
    $telefone     = $_POST['telefone']     ?? '';
    $nomeempresa  = $_POST['nomeempresa']  ?? '';
    $cnpj         = $_POST['cnpj']         ?? '';
    $mensagem     = $_POST['message']      ?? '';

    // verificação de IF se o usuário digitou todos os campos obrigatórios
    if (!$nome || !$telefone || !$email || !$nomeempresa) {
        echo json_encode(['success' => false, 'error' => 'Preencha todos os campos obrigatórios.']);
        exit;
    }
    // ------------------------------------------

    // ------------------------------------------
    // config padrão para o envio de emails, está usando meu email privado com as informações para acesso do gmail
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'gabrielmloquetti@gmail.com';
    $mail->Password   = 'qothiwmpuwscjuta';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    // ------------------------------------------

    // ------------------------------------------
    // envio de email, aqui que serão adicionados os emails que serão enviados
    $mail->setFrom('gabrielmloquetti@gmail.com', 'Contato xNeedWare'); // será enviado pelo email de Gabriel
    $mail->addAddress($email, $nome); // email e nome do cliente
    $mail->addAddress('gabrielmloquetti@gmail.com', 'CEO xNeedWare'); 
    $mail->addAddress('matcarvalholol87@gmail.com', 'Gerente de Projetos');
    $mail->addAddress('bruno.correr.coa@gmail.com', 'Desenvolvedor Full Stack');
    $mail->addAddress('felipeloteriodev@gmail.com', 'Analista de Sistemas');
    // ------------------------------------------

    // ------------------------------------------
    // estrutura de texto que será enviado no email
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
    // ------------------------------------------

    // ------------------------------------------
    // lidando com erros e retorno de aviso de erro para o usuário
    if ($mail->send()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Erro ao enviar: ' . $mail->ErrorInfo]);
    }

    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Erro: ' . $e->getMessage()]);
    }
    // ------------------------------------------

?>