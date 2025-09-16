<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>xNeedWare - Pagamento</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="./../bootstraps/header.css">
    <link rel="stylesheet" href="./../bootstraps/footer.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/all.css">
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-solid.css">
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-regular.css">
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/sharp-light.css">
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/duotone.css"/>
    <link rel="stylesheet" href="https://site-assets.fontawesome.com/releases/v6.7.2/css/brands.css"/>
        <script src="https://pay.google.com/gp/p/js/pay.js"></script>
    <link rel="icon" type="image/x-icon" href="../assets/favicon.ico">

</head>
<body>
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
                    <?php include '../../public/header-usuario.php'; ?>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero">
            <h1>Pagamento xNeedWare</h1>
            <p class="subtitle">Complete seu pagamento para ter acesso ao produto da plataforma.</p>
        </section>

        <section class="checkout-container">
            <div class="checkout-form">
                <div class="form-progress">
                    <div class="progress-step active">
                        <div class="step-number">1</div>
                        <div class="step-text">Produto</div>
                    </div>
                    <div class="progress-line"></div>
                    <div class="progress-step">
                        <div class="step-number">2</div>
                        <div class="step-text">Dados</div>
                    </div>
                    <div class="progress-line"></div>
                    <div class="progress-step">
                        <div class="step-number">3</div>
                        <div class="step-text">Pagamento</div>
                    </div>
                    <div class="progress-line"></div>
                    <div class="progress-step">
                        <div class="step-number">4</div>
                        <div class="step-text">Confirmação</div>
                    </div>
                </div>

                <form id="payment-form">
                    <div class="form-step" id="step-1">
                        <h2>Escolha seu produto</h2>
                        
                        <div class="product-options">
                            <div class="product-option">
                                <input type="radio" name="product" id="product-chatbot" value="chatbot" data-price="99.00" data-name="xNeed ChatBot">
                                <label for="product-chatbot" class="product-label recommended">
                                    <div class="recommended-badge">Recomendado</div>
                                    <div class="product-header">
                                        <h3>xNeed ChatBot</h3>
                                        <div class="product-price">
                                            <span class="price">R$ 99,00</span>
                                        </div>
                                    </div>
                                    <ul class="product-features">
                                        <li><span class="check-icon">✓</span><span>Redução de custos com Suporte</span></li>
                                        <li><span class="check-icon">✓</span><span>Coleta de dados automatizada</span></li>
                                        <li><span class="check-icon">✓</span><span>Escalabilidade no atendimento</span></li>
                                        <li><span class="check-icon">✓</span><span>Conversões mais eficientes</span></li>
                                    </ul>
                                </label>
                            </div>

                            <div class="product-option">
                                <input type="radio" name="product" id="product-downloader" value="downloader" data-price="39.00" data-name="xNeed Downloader">
                                <label for="product-downloader" class="product-label">
                                    <div class="product-header">
                                        <h3>xNeed Downloader</h3>
                                        <div class="product-price">
                                            <span class="price">R$ 39,00</span>
                                        </div>
                                    </div>
                                    <ul class="product-features">
                                        <li><span class="check-icon">✓</span><span>Funcionamento simples feito em python</span></li>
                                        <li><span class="check-icon">✓</span><span>Download rápido</span></li>
                                        <li><span class="check-icon">✓</span><span>Interação natural</span></li>
                                        <li><span class="check-icon">✓</span><span>Integração com sistemas</span></li>
                                    </ul>
                                </label>
                            </div>

                            <div class="product-option">
                                <input type="radio" name="product" id="product-basic" value="qr_code" data-price="9.90" data-name="xNeed QrGenerator">
                                <label for="product-basic" class="product-label">
                                    <div class="product-header">
                                        <h3>xNeed QrGenerator</h3>
                                        <div class="product-price">
                                            <span class="price">R$ 9,90</span>
                                        </div>
                                    </div>
                                    <ul class="product-features">
                                        <li><span class="check-icon">✓</span><span>Redução de custos com geração manual</span></li>
                                        <li><span class="check-icon">✓</span><span>Automatização na criação de QR Code</span></li>
                                        <li><span class="check-icon">✓</span><span>Escalabilidade na geração e distribuição</span></li>
                                        <li><span class="check-icon">✓</span><span>Facilidade na personalização e uso</span></li>
                                    </ul>
                                </label>
                            </div>

                            <div class="product-option">
                                <input type="radio" name="product" id="product-message" value="message" data-price="59.00" data-name="xNeed Message" checked>
                                <label for="product-message" class="product-label">
                                    <div class="product-header">
                                        <h3>xNeed Message</h3>
                                        <div class="product-price">
                                            <span class="price">R$ 59,00</span>
                                        </div>
                                    </div>
                                    <ul class="product-features">
                                        <li><span class="check-icon">✓</span><span>Envio de mensagens 24 horas por dia.</span></li>
                                        <li><span class="check-icon">✓</span><span>Mensagens enviadas instantaneamente.</span></li>
                                        <li><span class="check-icon">✓</span><span>Comunicação automática com linguagem natural.</span></li>
                                        <li><span class="check-icon">✓</span><span>Integração com sistemas</span></li>
                                    </ul>
                                </label>
                            </div>

                            <div class="product-option">
                                <input type="radio" name="product" id="product-enterprise" value="excel" data-price="49.90" data-name="xNeed Graphics">
                                <label for="product-enterprise" class="product-label">
                                    <div class="product-header">
                                        <h3>xNeed Graphics</h3>
                                        <div class="product-price">
                                            <span class="price">R$ 49,90</span>
                                        </div>
                                    </div>
                                    <ul class="product-features">
                                        <li><span class="check-icon">✓</span><span>Redução de custos com suporte</span></li>
                                        <li><span class="check-icon">✓</span><span>Coleta automatizada de dados</span></li>
                                        <li><span class="check-icon">✓</span><span>Conversões mais eficientes</span></li>
                                        <li><span class="check-icon">✓</span><span>Escalabilidade no atendimento</span></li>
                                    </ul>
                                </label>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button type="button" class="btn-next" onclick="nextStep(1)">Continuar</button>
                        </div>
                    </div>

                    <div class="form-step hidden" id="step-2">
                        <h2>Informações pessoais</h2>
                        
                        <div class="form-group">
                            <label for="name">Nome completo</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="cpf">CPF</label>
                                <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Telefone</label>
                                <input type="tel" id="phone" name="phone" placeholder="(00) 00000-0000" required>
                            </div>
                        </div>

                        <h3>Informações da empresa</h3>
                        
                        <div class="form-group">
                            <label for="company">Nome da empresa</label>
                            <input type="text" id="company" name="company">
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="cnpj">CNPJ</label>
                                <input type="text" id="cnpj" name="cnpj" placeholder="00.000.000/0000-00">
                            </div>
                            <div class="form-group">
                                <label for="company-size">Tamanho da empresa</label>
                                <select id="company-size" name="company-size">
                                    <option value="">Selecione</option>
                                    <option value="1-10">1-10 funcionários</option>
                                    <option value="11-50">11-50 funcionários</option>
                                    <option value="51-200">51-200 funcionários</option>
                                    <option value="201+">201+ funcionários</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button type="button" class="btn-back" onclick="prevStep(2)">Voltar</button>
                            <button type="button" class="btn-next" onclick="nextStep(2)">Continuar</button>
                        </div>
                    </div>

                    <div class="form-step hidden" id="step-3">
                        <h2>Informações de pagamento</h2>
                        
                        <div class="payment-methods">
                            <div class="payment-method-tabs">
                                <button type="button" class="payment-tab active" data-method="google-pay">Google Pay</button>
                                <button type="button" class="payment-tab" data-method="pix">PIX</button>
                            </div>

                            <div class="payment-method-content" id="google-pay-content">
                                <div class="google-pay-section">
                                    <div class="google-pay-info">
                                        <i class="fab fa-google-pay" style="font-size: 2rem; color: #4285f4; margin-bottom: 15px;"></i>
                                        <p>Pague de forma rápida e segura com o Google Pay</p>
                                        <p class="payment-security">🔒 Seus dados de pagamento ficam protegidos</p>
                                    </div>
                                    <div id="google-pay-button-container">
                                        <div id="google-pay-button"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="payment-method-content hidden" id="pix-content">
                                <div class="pix-info">
                                    <p>Ao finalizar sua compra, você receberá um QR Code para pagamento via PIX.</p>
                                    <p>O pagamento via PIX é processado instantaneamente.</p>
                                    <div class="pix-icon"></div>
                                </div>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button type="button" class="btn-back" onclick="prevStep(3)">Voltar</button>
                            <button type="button" class="btn-next" onclick="nextStep(3)">Continuar</button>
                        </div>
                    </div>

                    <div class="form-step hidden" id="step-4">
                        <h2>Confirme seu pedido</h2>
                        
                        <div class="order-summary">
                            <h3>Resumo da compra</h3>
                            <div class="summary-item">
                                <div class="summary-label">Produto</div>
                                <div class="summary-value" id="summary-product"></div>
                            </div>
                            <div class="summary-item">
                                <div class="summary-label">Forma de pagamento</div>
                                <div class="summary-value" id="summary-payment">Google Pay</div>
                            </div>
                            <div class="summary-item total">
                                <div class="summary-label">Total</div>
                                <div class="summary-value" id="summary-total">R$ 00,00</div>
                            </div>
                        </div>
                        
                        <div class="terms-agreement">
                            <label class="checkbox-container">
                                <input type="checkbox" id="terms" name="terms" required>
                                <span class="checkmark"></span>
                                <span>Concordo com os <a href="#" class="terms-link">Termos de Serviço</a> e <a href="#" class="terms-link">Política de Privacidade</a></span>
                            </label>
                        </div>

                        <div class="form-actions">
                            <button type="button" class="btn-back" onclick="prevStep(4)">Voltar</button>
                            <button type="submit" class="btn-submit">Finalizar compra</button>
                        </div>
                    </div>
                </form>
            </div>

            <!-- BARRA DA DIREITA -->
            <div class="checkout-sidebar">
                <div class="order-summary-card">
                    <h3>Resumo do pedido</h3>
                    <div class="summary-item">
                        <div class="summary-value" id="sidebar-product"></div>
                    </div>
                    <div class="summary-item total">
                        <div class="summary-label">Total</div>
                        <div class="summary-value" id="sidebar-total">R$ 00,00</div>
                    </div>
                </div>
                
                <div class="secure-payment">
                    <div class="secure-icon">🔒</div>
                    <p>Pagamento 100% seguro</p>
                </div>
                
                <div class="help-section">
                    <h4>Precisa de ajuda?</h4>
                    <p>Entre em contato com nosso suporte:</p>
                    <a href="mailto:suporte@xneedware.com" class="support-link">suporte@xneedware.com</a>
                    <a href="tel:+551199999999" class="support-link">+55 11 9999-9999</a>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <a href="index.html" class="logo">
                        <span class="logo-x">x</span><span class="logo-text">NeedWare</span>
                    </a>
                    <p class="footer-description">
                        Transformando empresas através de soluções de software inovadoras e eficientes.
                    </p>
                    <div class="social-links">
                        <a href="https://www.instagram.com/xneedware/" class="social-link"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.linkedin.com/company/xneedware/posts/?feedView=all" class="social-link"><i class="fab fa-linkedin-in"></i></a>
                        <a href="https://github.com/Projeto-xNeedWare" class="social-link"><i class="fab fa-github"></i></a>
                    </div>
                </div>
                <div class="footer-links">
                    <h3 class="footer-title">Produtos</h3>
                    <ul>
                        <li><a href="../produtos/produtos_separados/chatbot.html">xNeed Chatbot</a></li>
                        <li><a href="../produtos/produtos_separados/downloader.html">xNeed Downloader</a></li>
                        <li><a href="../produtos/produtos_separados/message.html">xNeed Message</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h3 class="footer-title">Empresa</h3>
                    <ul>
                        <li><a href="../sobre/index.html">Sobre Nós</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h3 class="footer-title">Suporte</h3>
                    <ul>
                        <li><a href="../politica_privacidade/index.html">Política de Privacidade</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <span id="currentYear"></span> xNeedWare. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>

    <script src="../../public/pagamento.js"></script>
    <script src="../../public/google-pay.js"></script>
    
</body>
</html>
