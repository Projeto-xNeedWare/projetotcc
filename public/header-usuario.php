<?php
session_start();
$usuario = $_SESSION['usuario_nome'] ?? $_COOKIE['nome'] ?? null;
?>

<?php if ($usuario): ?>
    <div class="usuario-menu" style="position: relative; display: inline-block;">
        <a title="Acesse sua conta" href="../conta-usuario/minha-conta.php" style="margin-left: 20px; font-size: 1.2rem;">
            <i class="fa-thin fa-circle-user"></i> Olá, <?php echo htmlspecialchars($usuario); ?>
        </a>
        <div class="usuario-dropdown" style="display: none; padding: 10px; width: 150px; position: absolute; background: #000000ff; border: 1px solid #ccc; right: 0; z-index: 10;">
            <a href="../conta-usuario/minha-conta.php">Minha Conta</a><br>
            <a href="../../public/logout.php">Sair</a>
        </div>
    </div>
    <script>
        const menu = document.querySelector('.usuario-menu');
        const dropdown = document.querySelector('.usuario-dropdown');
        menu.onmouseover = () => dropdown.style.display = 'block';
        menu.onmouseout = () => dropdown.style.display = 'none';
    </script>
<?php else: ?>
    <a title="Entre na sua conta" href="../login/index.html">
        <i class="fa-thin fa-circle-user" style="margin-left: 20px; font-size: 2rem;"></i>
    </a>
<?php endif; ?>