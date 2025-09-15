<?php
session_start();
$usuario = $_SESSION['usuario_nome'] ?? $_COOKIE['nome'] ?? null;
?>

<?php if ($usuario): ?>
    <a title="Acesse sua conta" href="../conta-usuario/minha-conta.php" style="margin-left: 20px; font-size: 1.2rem;">
        <i class="fa-thin fa-circle-user"></i> Olá, <?php echo htmlspecialchars($usuario); ?>
    </a>
<?php else: ?>
    <a title="Entre na sua conta" href="../login/index.html">
        <i class="fa-thin fa-circle-user" style="margin-left: 20px; font-size: 2rem;"></i>
    </a>
<?php endif; ?>