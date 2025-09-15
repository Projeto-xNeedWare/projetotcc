<?php
// ===============================
// VERIFICAÇÃO DE LOGIN VIA COOKIE
// ===============================

// Se o cookie "login" não existir → manda pro login
if (!isset($_COOKIE["login"])) {
    header("Location: ../login/index.html");
    exit();
}

// Se existir, guarda o nome do usuário
$login_cookie = $_COOKIE["login"];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Conta - xNeedWare</title>
    <link rel="stylesheet" href="../../public/styles.css">
    <link rel="stylesheet" href="./../bootstraps/header.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/all.css">
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-solid.css">
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-regular.css">
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-light.css">
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone.css"/>
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/brands.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <link rel="icon" type="image/x-icon" href="../assets/favicon.ico">
</head>
<body>
     <!-- Cabeçalho -->
     <header class="xneedware-header">
        <div class="header-container">
            <a href="../pagina_inicial/index.html" class="logo">
                <span class="logo-x">x</span><span class="logo-text">NeedWare</span>
            </a>
            
            <button class="menu-toggle" id="mobile-menu">
                <i class="fas fa-bars"></i>
            </button>
        
            <nav class="main-nav">
                <ul>
                    <li><a href="../produtos/index.html">Produtos</a></li>
                    <li><a href="../sobre/index.html">Sobre</a></li>
                    <li><a href="./../pagina_inicial/index.html#contato">Contato</a></li>
                    <a href="../login/index.html"><i class="fa-light fa-user-bounty-hunter icone-grande"></i></a>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Conteúdo Principal -->
    <main class="container">
        <h1 class="page-title">Minha Conta</h1>
        <h1>Bem-vindo, <span id="nomeUsuario"><?php echo $login_cookie; ?></span>!</h1>

        <!-- Cards de Estatísticas -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon purple">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <div class="stat-info">
                    <p class="stat-label">Total de Compras</p>
                    <h3 class="stat-value">0</h3>
                </div>
            </div>
         
            <div class="stat-card">
                <div class="stat-icon indigo">
                    <i class="fas fa-chart-bar"></i>
                </div>
                <div class="stat-info">
                    <p class="stat-label">Valor Total</p>
                    <h3 class="stat-value">R$ 0,00</h3>
                </div>
            </div>
        </div>

        <!-- Sistema de Abas -->
        <div class="tabs-container">
            <div class="tabs">
                <button class="tab-btn active" data-tab="info">Dados Pessoais</button>
                <button class="tab-btn" data-tab="purchases">Compras</button>
                <button class="tab-btn" data-tab="settings">Configurações</button>
            </div>

            <!-- Aba: Dados Pessoais -->
            <div class="tab-content active" id="info">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Dados Pessoais</h2>
                        <p class="card-description">Gerencie suas informações pessoais</p>
                    </div>
                    <div class="card-content">
                        <form class="user-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="name">Nome</label>
                                    <input type="text" id="name" value="<?php echo $login_cookie; ?>" placeholder="Seu nome">
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" id="email" value="" placeholder="seu@email.com">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="phone">Telefone</label>
                                    <input type="text" id="phone" value="" placeholder="(00) 00000-0000">
                                </div>
                                <div class="form-group">
                                    <label for="cpf">CPF</label>
                                    <input type="text" id="cpf" value="" placeholder="000.000.000-00">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="address">Endereço</label>
                                <input type="text" id="address" value="" placeholder="Seu endereço">
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="city">Cidade</label>
                                    <input type="text" id="city" value="" placeholder="Sua cidade">
                                </div>
                                <div class="form-group">
                                    <label for="state">Estado</label>
                                    <input type="text" id="state" value="" placeholder="Seu estado">
                                </div>
                                <div class="form-group">
                                    <label for="zip">CEP</label>
                                    <input type="text" id="zip" value="" placeholder="00000-000">
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-primary" id="saveButton">Salvar Alterações</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Aba: Compras -->
            <div class="tab-content" id="purchases">
                <!-- Seu conteúdo de histórico de compras -->
            </div>

            <!-- Aba: Configurações -->
            <div class="tab-content" id="settings">
                <!-- Seu conteúdo de configurações -->
            </div>
        </div>
    </main>

    <script>
        // Script de alternância de abas
        document.addEventListener('DOMContentLoaded', function() {
            const tabButtons = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));
                    
                    button.classList.add('active');
                    const tabId = button.getAttribute('data-tab');
                    document.getElementById(tabId).classList.add('active');
                });
            });

            // Toggle switches
            const toggles = document.querySelectorAll('.toggle');
            toggles.forEach(toggle => {
                toggle.addEventListener('click', () => {
                    toggle.classList.toggle('active');
                });
            });
        });
    </script>

    <script src="/header-script.js"></script>
    <script src="/dashboard.js"></script>
</body>
</html>
