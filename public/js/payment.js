/**
 * =======================================================
 * SCRIPT DE CHECKOUT SIMPLIFICADO E COMENTADO (V2 - COM CSS BONITO)
 * Feito para estudantes que estão aprendendo, mas já sabem o básico de JS.
 * =======================================================
 */

// =======================================================
// 1. VARIÁVEIS GLOBAIS (NOSSOS "CADERNOS DE ANOTAÇÕES")
// =======================================================
let currentStep = 0; // Começamos no passo 0 (Carrinho)
let paymentsClient = null; // Variável para o Google Pay (será preenchida depois)

// Configuração básica do Google Pay (mantida para a funcionalidade)
const GOOGLE_PAY_CONFIG = {
    baseRequest: { apiVersion: 2, apiVersionMinor: 0 },
    allowedPaymentMethods: [{
        type: 'CARD',
        parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA']
        },
        tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId'
            }
        }
    }]
};

// =======================================================
// 2. FUNÇÕES DE INICIALIZAÇÃO (O QUE ACONTECE QUANDO A PÁGINA ABRE)
// =======================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Atualiza o ano no rodapé (se você tiver um elemento com id='currentYear')
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    
    // 2. Tenta carregar os dados do usuário (se ele estiver logado)
    loadUserData();
    
    // 3. Mostra o carrinho com os itens
    atualizarCarrinho();
    
    // 4. Inicializa o Google Pay
    initializeGooglePay();
    
    // 5. Inicializa a lógica de seleção de pagamento (o clique nos cards)
    initializePaymentSelection(); 
    
    // 6. Mostra o primeiro passo do formulário
    showStep(0); 
});

/**
 * Inicializa o cliente Google Pay.
 * É uma função recursiva (chama a si mesma) até que a API do Google Pay esteja pronta.
 */
function initializeGooglePay() {
    if (window.google && window.google.payments) {
        paymentsClient = new google.payments.api.PaymentsClient({
            environment: 'TEST' // Lembre-se de mudar para 'PRODUCTION' quando for para o ar!
        });
        console.log('✅ Google Pay inicializado com sucesso');
    } else {
        // Se não estiver pronto, espera 500ms e tenta de novo
        setTimeout(initializeGooglePay, 500);
    }
}

/**
 * Tenta carregar o nome e email do usuário a partir da API do servidor.
 */
async function loadUserData() {
    try {
        const res = await fetch("/api/usuario");
        if (res.ok) {
            const usuario = await res.json();
            // Preenche o nome no Step 2 e o email no formulário
            document.getElementById("user-nome-step2").textContent = usuario.nome + " " + usuario.sobrenome;
            document.getElementById("email").value = usuario.email;
            document.getElementById("summary-email").textContent = usuario.email;
        }
    } catch (error) {
        console.log("Usuário não logado. Tudo bem, ele fará login depois.");
    }
}

// =======================================================
// 3. SISTEMA DE PASSO A PASSO (MULTI-STEP)
// =======================================================

/**
 * Mostra um passo específico do formulário e esconde os outros.
 * @param {number} step - O número do passo (0, 1, 2, 3).
 */
function showStep(step) {
    // Esconde todos os passos
    document.querySelectorAll('.form-step').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('active');
    });
    
    // Mostra o passo que queremos
    const currentStepEl = document.getElementById(`step-${step}`);
    if (currentStepEl) {
        currentStepEl.classList.remove('hidden');
        currentStepEl.classList.add('active');
    }
    
    updateProgress(step);
    currentStep = step; // Atualiza nosso "caderno de anotações"
    
    // Se chegamos no último passo (3), atualiza o resumo final
    if (step === 3) {
        updateFinalSummary();
    }
}

/**
 * Função chamada pelo botão "Continuar".
 */
function nextStep() {
    // Só avança se o passo atual for válido
    if (validateCurrentStep()) {
        if (currentStep < 3) {
            showStep(currentStep + 1);
        }
    }
}

/**
 * Função chamada pelo botão "Voltar".
 */
function prevStep() {
    if (currentStep > 0) {
        showStep(currentStep - 1);
    }
}

/**
 * Atualiza visualmente a barra de progresso (os círculos).
 * @param {number} step - O passo atual.
 */
function updateProgress(step) {
    document.querySelectorAll('.progress-step').forEach((stepEl, index) => {
        // Se o índice do passo for menor ou igual ao passo atual, ele está ativo
        if (index <= step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });
}

/**
 * Verifica se os campos do passo atual estão preenchidos corretamente.
 * @returns {boolean} True se estiver OK, False se houver erro.
 */
function validateCurrentStep() {
    switch(currentStep) {
        case 0: // Validação do Carrinho
            const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            if (carrinho.length === 0) {
                alert('Seu carrinho está vazio. Adicione produtos antes de continuar.');
                return false;
            }
            return true;
            
        case 1: // Validação do Email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email || !emailRegex.test(email.value)) {
                alert('Por favor, informe um email válido.');
                email.focus();
                return false;
            }
            return true;
            
        case 2: // Validação da Seleção de Pagamento
            // Verifica se o radio button de pagamento está marcado
            const selectedPayment = document.querySelector('input[name="payment-method"]:checked');
            if (!selectedPayment) {
                alert('Por favor, selecione um método de pagamento.');
                return false;
            }
            return true;
            
        case 3: // Validação dos Termos
            const termsCheckbox = document.getElementById('terms');
            if (!termsCheckbox.checked) {
                alert('Por favor, aceite os termos de serviço.');
                return false;
            }
            return true;
            
        default:
            return true;
    }
}

// =======================================================
// 4. SISTEMA DO CARRINHO E RESUMO
// =======================================================

/**
 * Atualiza a lista de itens do carrinho e o resumo lateral.
 */
function atualizarCarrinho() {
    const carrinhoContainer = document.getElementById("carrinhoContainer");
    const sidebarProducts = document.getElementById("sidebar-products");
    const sidebarTotal = document.getElementById("sidebar-total");

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinhoContainer.innerHTML = "";
    sidebarProducts.innerHTML = "";

    if (carrinho.length === 0) {
        // Mostra mensagem de carrinho vazio
        carrinhoContainer.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: #666;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.5;"></i>
                <p>Seu carrinho está vazio.</p>
                <a href="/produtos" style="color: #8a5cf5; text-decoration: none;">Continuar comprando</a>
            </div>
        `;
        sidebarTotal.textContent = "R$ 0,00";
        return;
    }

    let total = 0;

    carrinho.forEach(item => {
        const itemTotal = item.preco * item.quantidade;
        total += itemTotal;

        // Cria o item na lista principal (Step 0)
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.nome}</h4>
                <p>R$ ${item.preco.toFixed(2)} x 
                <input type="number" min="1" value="${item.quantidade}" data-id="${item.id}" class="qtd-input"> 
                = R$ ${itemTotal.toFixed(2)}</p>
            </div>
            <button class="remover-btn" data-id="${item.id}" title="Remover item">
                <i class="fas fa-trash"></i>
            </button>
        `;
        carrinhoContainer.appendChild(div);

        // Cria o item no resumo lateral
        const summaryDiv = document.createElement("div");
        summaryDiv.classList.add("summary-item");
        summaryDiv.innerHTML = `
            <div class="summary-label">${item.nome} (${item.quantidade}x)</div>
            <div class="summary-value">R$ ${itemTotal.toFixed(2)}</div>
        `;
        sidebarProducts.appendChild(summaryDiv);
    });

    sidebarTotal.textContent = `R$ ${total.toFixed(2)}`;

    // Adiciona os eventos de clique e mudança de quantidade
    addCartEventListeners(carrinho);
}

/**
 * Adiciona listeners para os botões de remover e inputs de quantidade.
 * @param {Array} carrinho - O array atual do carrinho.
 */
function addCartEventListeners(carrinho) {
    // Listener para remover item
    document.querySelectorAll(".remover-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const novoCarrinho = carrinho.filter(p => p.id !== id);
            localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
            atualizarCarrinho(); // Recarrega o carrinho
        });
    });

    // Listener para alterar quantidade
    document.querySelectorAll(".qtd-input").forEach(input => {
        const updateQuantity = () => {
            const id = input.dataset.id;
            const produto = carrinho.find(p => p.id === id);
            if (produto) {
                produto.quantidade = Math.max(1, parseInt(input.value) || 1);
                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                atualizarCarrinho(); // Recarrega o carrinho
            }
        };

        input.addEventListener("change", updateQuantity);
        input.addEventListener("blur", updateQuantity);
    });
}

/**
 * Atualiza o resumo final no Step 3 com os dados do carrinho e do formulário.
 */
function updateFinalSummary() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const total = calcularTotalCarrinho();
    const email = document.getElementById('email').value;
    const selectedPayment = document.querySelector('input[name="payment-method"]:checked');
    
    // Resumo do Produto
    const summaryProduct = document.getElementById('summary-product');
    if (summaryProduct) {
        summaryProduct.textContent = carrinho.length === 1 ? carrinho[0].nome : `${carrinho.length} produtos`;
    }
    
    // Resumo do Pagamento
    const summaryPayment = document.getElementById('summary-payment');
    if (summaryPayment && selectedPayment) {
        // Pega o nome do método do atributo data-method do elemento pai
        const paymentMethodName = selectedPayment.closest('.payment-option').getAttribute('data-method');
        summaryPayment.textContent = paymentMethodName.toUpperCase().replace('-', ' ');
    }
    
    // Resumo do Email
    const summaryEmail = document.getElementById('summary-email');
    if (summaryEmail) {
        summaryEmail.textContent = email;
    }
    
    // Resumo do Total
    const summaryTotal = document.getElementById('summary-total');
    if (summaryTotal) {
        summaryTotal.textContent = `R$ ${total.toFixed(2)}`;
    }
}

/**
 * Calcula o total do carrinho.
 * @returns {number} O valor total.
 */
function calcularTotalCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

// =======================================================
// 5. LÓGICA DE SELEÇÃO DE PAGAMENTO (CLIQUE NO CARD)
// =======================================================

/**
 * Adiciona a lógica de clique nos cards de pagamento para simular o radio button.
 */
function initializePaymentSelection() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            const radio = this.querySelector('input[type="radio"]');
            
            // Se já estiver selecionado, não faz nada
            if (radio.checked) {
                return;
            }

            // 1. Remove a classe 'selected' de todos os outros cards
            paymentOptions.forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // 2. Adiciona a classe 'selected' no card clicado (feedback visual)
            this.classList.add('selected');
            
            // 3. Marca o radio button (o navegador cuida da desmarcação dos outros)
            radio.checked = true;
        });
    });
    
    // Garante que o estado inicial do HTML (com 'selected' e 'checked') esteja sincronizado
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        if (radio.checked) {
            radio.closest('.payment-option').classList.add('selected');
        }
    });
}

// =======================================================
// 6. FLUXO DE PAGAMENTO E LOGIN
// =======================================================

/**
 * Inicia o fluxo de pagamento (Google Pay) após a validação final.
 */
function iniciarPagamentoGooglePay() {
    // Validação final dos termos
    if (!validateCurrentStep()) {
        return;
    }

    // Verifica se o usuário está logado
    fetch("/api/usuario")
        .then(res => {
            if (!res.ok) {
                // Se não estiver logado, mostra o modal
                mostrarModalLogin();
                return;
            }
            return res.json();
        })
        .then(usuario => {
            if (usuario) {
                // Se estiver logado, prossegue com o pagamento
                processarPagamentoGooglePay(usuario);
            }
        })
        .catch(error => {
            console.error("Erro ao verificar login:", error);
            mostrarModalLogin();
        });
}

/**
 * Processa o pagamento via Google Pay.
 * @param {object} usuario - Dados do usuário logado.
 */
function processarPagamentoGooglePay(usuario) {
    // ... (Lógica do Google Pay mantida do original para a funcionalidade) ...
    // A lógica aqui é complexa e depende da API do Google Pay.
    // Para simplificar, vamos manter a estrutura original, mas com comentários.

    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<div class="loading-spinner"></div>';
    submitBtn.disabled = true;

    if (!paymentsClient) {
        showPaymentError(submitBtn, originalText);
        return;
    }

    const total = calcularTotalCarrinho();
    if (total === 0) {
        alert('Seu carrinho está vazio.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }

    const paymentDataRequest = {
        ...GOOGLE_PAY_CONFIG.baseRequest,
        allowedPaymentMethods: GOOGLE_PAY_CONFIG.allowedPaymentMethods,
        transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: total.toFixed(2),
            currencyCode: 'BRL',
            countryCode: 'BR'
        },
        merchantInfo: {
            merchantId: 'BCR2DN4T26QN5K5L',
            merchantName: 'xNeedWare'
        }
    };

    // 1. Verifica se o Google Pay está disponível
    paymentsClient.isReadyToPay({
        ...GOOGLE_PAY_CONFIG.baseRequest,
        allowedPaymentMethods: GOOGLE_PAY_CONFIG.allowedPaymentMethods
    })
    .then(function(response) {
        if (response.result) {
            // 2. Inicia o fluxo de pagamento
            paymentsClient.loadPaymentData(paymentDataRequest)
                .then(function(paymentData) {
                    processarPagamentoSucesso(total);
                })
                .catch(function(err) {
                    // Trata cancelamento ou erro
                    if (err.statusCode === 'CANCELED') {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    } else {
                        showPaymentError(submitBtn, originalText);
                    }
                });
        } else {
            showPaymentError(submitBtn, originalText);
        }
    })
    .catch(function(err) {
        showPaymentError(submitBtn, originalText);
    });
}

/**
 * Trata o sucesso do pagamento.
 * @param {number} total - O valor total pago.
 */
function processarPagamentoSucesso(total) {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    // Envia para histórico (mantido do original)
    carrinho.forEach(item => {
        fetch('/api/historico-pagamento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                produto: item.nome,
                valor: item.preco,
                quantidade: item.quantidade,
                total: total,
                metodo: 'google-pay'
            })
        }).catch(err => console.error('Erro ao salvar histórico:', err));
    });

    // Limpa carrinho após compra
    localStorage.removeItem("carrinho");
    
    // Mostra confirmação de sucesso no Step 3
    const step3 = document.getElementById('step-3');
    if (step3) {
        step3.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 4rem; color: #28a745; margin-bottom: 20px;">
                    ✅
                </div>
                <h2 style="color: #28a745; margin-bottom: 15px;">Pagamento Aprovado!</h2>
                <p style="color: #c0c0c0; margin-bottom: 25px;">
                    Seu pagamento de <strong>R$ ${total.toFixed(2)}</strong> 
                    foi processado com sucesso via Google Pay.
                </p>
                <p style="color: #c0c0c0; font-size: 14px; margin-bottom: 30px;">
                    Você receberá um email com as instruções de download em breve.
                </p>
                <button onclick="window.location.href='/conta'" class="btn-primary" style="margin: 5px;">
                    Ver Meus Pedidos
                </button>
                <button onclick="window.location.href='/produtos'" class="btn-outline" style="margin: 5px;">
                    Continuar Comprando
                </button>
            </div>
        `;
    }
}

/**
 * Trata o erro no pagamento.
 */
function showPaymentError(submitBtn, originalText) {
    submitBtn.textContent = 'Tentar Novamente';
    submitBtn.disabled = false;
    
    alert('Erro ao processar pagamento com Google Pay. Por favor, tente novamente ou entre em contato com o suporte.');
}

// =======================================================
// 7. LÓGICA DE LOGIN/CADASTRO (MODAL)
// =======================================================

/**
 * Salva a URL atual no localStorage para redirecionamento pós-login.
 */
function salvarPaginaAtual() {
    const paginaAtual = window.location.href;
    const paginasIgnorar = ['/login', '/registro', '/cadastro', '/auth'];
    
    const deveIgnorar = paginasIgnorar.some(pagina => paginaAtual.includes(pagina));
    
    if (!deveIgnorar) {
        localStorage.setItem('paginaAnterior', paginaAtual);
        return true;
    }
    return false;
}

/**
 * Exibe o modal de login.
 */
function mostrarModalLogin() {
    // Remove qualquer modal existente para evitar duplicidade
    fecharModalLogin(); 

    const modalHTML = `
        <div id="loginModal" class="login-modal">
            <div class="login-modal-content">
                <span class="close-modal" onclick="fecharModalLogin()">&times;</span>
                <h3>Login Necessário</h3>
                <p>Para finalizar sua compra, faça login em sua conta.</p>
                <div class="modal-buttons">
                    <a href="javascript:void(0)" onclick="prepararLogin()" class="btn-login">
                        Fazer Login
                    </a>
                    <a href="javascript:void(0)" onclick="prepararCadastro()" class="btn-register">
                        Criar Conta
                    </a>
                    <button onclick="fecharModalLogin()" class="btn-continue">
                        Continuar Navegando
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

/**
 * Prepara o redirecionamento para a página de login.
 */
function prepararLogin() {
    salvarPaginaAtual();
    setTimeout(() => {
        window.location.href = "/login";
    }, 100);
}

/**
 * Prepara o redirecionamento para a página de cadastro.
 */
function prepararCadastro() {
    salvarPaginaAtual();
    setTimeout(() => {
        window.location.href = "/login?action=register";
    }, 100);
}

/**
 * Fecha o modal de login.
 */
function fecharModalLogin() {
    const modal = document.getElementById('loginModal');
    if (modal) modal.remove();
}

// =======================================================
// 8. ESTILOS DO MODAL (ADICIONADOS DIRETAMENTE AO HEAD)
// =======================================================

// Adiciona os estilos do modal ao documento (AGORA COM O CSS BONITO!)
const modalStyles = `
<style>
/* =======================================================
   ESTILOS DO MODAL DE LOGIN (MELHORADO)
   Foco em um design moderno, dark-themed, com gradientes e sombras sutis.
   ======================================================= */

.login-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Fundo semi-transparente escuro */
    background: rgba(0, 0, 0, 0.85); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

.login-modal-content {
    /* Fundo mais escuro para contraste */
    background: #1a1a2e; 
    padding: 40px; /* Mais padding */
    border-radius: 16px; /* Bordas mais suaves */
    text-align: center;
    max-width: 450px; /* Um pouco maior */
    width: 90%;
    position: relative;
    /* Sombra sutil para profundidade */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); 
    border: 1px solid rgba(255, 255, 255, 0.1); /* Borda fina para destaque */
    animation: slideUp 0.3s ease;
}

.close-modal {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 28px; /* Ícone maior */
    cursor: pointer;
    color: #8a5cf5; /* Cor principal */
    transition: color 0.2s ease;
}

.close-modal:hover {
    color: #ffffff;
}

.login-modal-content h3 {
    color: #ffffff; /* Título branco */
    margin-bottom: 10px;
    font-size: 1.8rem; /* Título maior */
    font-weight: 700;
}

.login-modal-content p {
    color: #b0b0b0; /* Texto cinza claro */
    margin-bottom: 30px;
    line-height: 1.6;
}

.modal-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px; /* Mais espaço entre os botões */
}

.btn-login, .btn-register, .btn-continue {
    padding: 16px 20px; /* Mais padding nos botões */
    border: none;
    border-radius: 10px; /* Bordas mais arredondadas */
    font-weight: 700;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.1rem;
    letter-spacing: 0.5px;
}

/* Botão de Login (Gradiente Principal) */
.btn-login {
    /* Gradiente mais vibrante */
    background: linear-gradient(90deg, #8a5cf5 0%, #6c00ff 100%); 
    color: white;
    box-shadow: 0 4px 15px rgba(138, 92, 245, 0.4);
}

/* Botão de Registro (Gradiente Secundário) */
.btn-register {
    /* Gradiente invertido ou complementar */
    background: linear-gradient(90deg, #00d2ff 0%, #2575fc 100%); 
    color: white;
    box-shadow: 0 4px 15px rgba(0, 210, 255, 0.3);
}

/* Botão de Continuar (Outline/Secundário) */
.btn-continue {
    background: transparent;
    color: #b0b0b0;
    border: 2px solid #333344; /* Borda sutil */
    margin-top: 10px;
}

.btn-login:hover, .btn-register:hover {
    transform: translateY(-3px); /* Efeito de elevação maior */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.btn-continue:hover {
    background: #333344;
    color: #ffffff;
}

/* Animações (Mantidas) */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { 
        opacity: 0;
        transform: translateY(30px);
    }
    to { 
        opacity: 1;
        transform: translateY(0);
    }
}

/* Responsividade */
@media (max-width: 480px) {
    .login-modal-content {
        padding: 25px;
        margin: 20px;
    }
    
    .modal-buttons {
        gap: 10px;
    }
    
    .btn-login, .btn-register, .btn-continue {
        padding: 14px 16px;
        font-size: 1rem;
    }
}
</style>
`;
document.head.insertAdjacentHTML('beforeend', modalStyles);
