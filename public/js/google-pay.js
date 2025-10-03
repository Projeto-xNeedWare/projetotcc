// ==================== CONFIGURAÇÃO INICIAL ====================
let paymentsClient;
let currentStep = 0; // Começa no step 0 (carrinho)

// Configuração base do Google Pay
const baseRequest = {
    apiVersion: 2,
    apiVersionMinor: 0
};

// Métodos de pagamento aceitos
const allowedPaymentMethods = [{
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
}];

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeGooglePay();
    setupPaymentTabs();
    updateProgress(0);
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// ==================== GOOGLE PAY ====================
function initializeGooglePay() {
    console.log('Inicializando Google Pay...');
    
    if (window.google && window.google.payments) {
        paymentsClient = new google.payments.api.PaymentsClient({
            environment: 'TEST' // Mude para 'PRODUCTION' em produção
        });

        const isReadyToPayRequest = {
            ...baseRequest,
            allowedPaymentMethods
        };

        paymentsClient.isReadyToPay(isReadyToPayRequest)
            .then(function(response) {
                console.log('Google Pay disponível:', response.result);
                if (response.result) {
                    createGooglePayButton();
                } else {
                    showGooglePayUnavailable();
                }
            })
            .catch(function(err) {
                console.error('Erro ao verificar Google Pay:', err);
                showGooglePayUnavailable();
            });
    } else {
        console.log('Google Pay API não carregada, tentando novamente...');
        // Tenta novamente se a API não estiver carregada
        setTimeout(initializeGooglePay, 500);
    }
}

function createGooglePayButton() {
    if (!paymentsClient) {
        console.log('PaymentsClient não inicializado');
        return;
    }

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    if (carrinho.length === 0) {
        console.log('Carrinho vazio');
        showEmptyCartMessage();
        return;
    }

    const total = calcularTotalCarrinho();
    console.log('Criando botão Google Pay para total:', total);

    const paymentDataRequest = {
        ...baseRequest,
        allowedPaymentMethods,
        transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: total.toFixed(2),
            currencyCode: 'BRL',
            countryCode: 'BR'
        },
        merchantInfo: {
            merchantId: 'BCR2DN4T26QN5K5L', // Substitua por seu merchant ID real
            merchantName: 'xNeedWare'
        }
    };

    try {
        const button = paymentsClient.createButton({
            onClick: () => handleGooglePayClick(paymentDataRequest),
            allowedPaymentMethods,
            buttonColor: 'black',
            buttonType: 'buy',
            buttonSizeMode: 'fill'
        });

        const container = document.getElementById('google-pay-button');
        if (container) {
            container.innerHTML = '';
            container.appendChild(button);
            console.log('Botão Google Pay criado com sucesso');
        } else {
            console.error('Container do Google Pay não encontrado');
            createFallbackButton();
        }
    } catch (error) {
        console.error('Erro ao criar botão Google Pay:', error);
        createFallbackButton();
    }
}

function createFallbackButton() {
    const container = document.getElementById('google-pay-button');
    if (container) {
        container.innerHTML = `
            <button type="button" class="google-pay-fallback-btn" onclick="handleFallbackGooglePay()" style="
                background: #000;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 4px;
                font-size: 16px;
                cursor: pointer;
                width: 100%;
                max-width: 300px;
                margin: 10px auto;
                display: block;
                font-weight: 500;
            ">
                <i class="fab fa-google-pay" style="margin-right: 8px;"></i>
                Pagar com Google Pay
            </button>
        `;
    }
}

function handleFallbackGooglePay() {
    console.log('Fallback Google Pay acionado');
    processGooglePayPayment({});
}

function showEmptyCartMessage() {
    const container = document.getElementById('google-pay-button');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #666;">
                <p>Adicione produtos ao carrinho para usar o Google Pay</p>
            </div>
        `;
    }
}

function showGooglePayUnavailable() {
    const container = document.getElementById('google-pay-button');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px; color: #666; border: 1px solid #ddd;">
                <i class="fab fa-google-pay" style="font-size: 2rem; color: #ccc; margin-bottom: 10px;"></i>
                <p style="margin: 10px 0; font-weight: 500;">Google Pay não disponível</p>
                <p style="font-size: 0.9rem; margin: 0;">Use PIX para finalizar sua compra</p>
            </div>
        `;
    }
}

function handleGooglePayClick(paymentDataRequest) {
    console.log('Iniciando pagamento Google Pay...');
    
    paymentsClient.loadPaymentData(paymentDataRequest)
        .then(function(paymentData) {
            console.log('Pagamento processado com sucesso:', paymentData);
            processGooglePayPayment(paymentData);
        })
        .catch(function(err) {
            console.error('Erro no pagamento Google Pay:', err);
            if (err.statusCode === 'CANCELED') {
                console.log('Usuário cancelou o pagamento');
                return;
            }
            alert('Erro ao processar pagamento com Google Pay. Tente novamente ou use PIX.');
        });
}

function processGooglePayPayment(paymentData) {
    console.log('Processando pagamento Google Pay...');
    
    // Aqui você enviaria o token para seu backend
    // const paymentToken = paymentData.paymentMethodData?.tokenizationData?.token;
    // if (paymentToken) {
    //     enviarParaBackend(paymentToken);
    // }
    
    // Simula processamento do pagamento
    showPaymentSuccess();
}

// ==================== TABS DE PAGAMENTO ====================
function setupPaymentTabs() {
    const tabs = document.querySelectorAll('.payment-tab');
    const contents = document.querySelectorAll('.payment-method-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const method = this.dataset.method;
            
            // Atualiza tabs
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Atualiza conteúdos
            contents.forEach(content => content.classList.add('hidden'));
            
            const targetContent = document.getElementById(method + '-content');
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
            
            updatePaymentSummary(method);
            
            // Re-inicializa Google Pay se for selecionado
            if (method === 'google-pay') {
                setTimeout(() => {
                    initializeGooglePay();
                }, 100);
            }
        });
    });
}

function updatePaymentSummary(method) {
    const paymentNames = {
        'google-pay': 'Google Pay',
        'pix': 'PIX'
    };
    
    const summaryPayment = document.getElementById('summary-payment');
    if (summaryPayment) {
        summaryPayment.textContent = paymentNames[method] || 'Google Pay';
    }
}

// ==================== NAVEGAÇÃO ENTRE STEPS ====================
function nextStep() {
    if (!validateCurrentStep(currentStep)) return;
    
    if (currentStep < 3) {
        showStep(currentStep + 1);
        
        // Atualiza o resumo final se for para o último step
        if (currentStep === 3) {
            updateFinalSummary();
        }
        
        // Inicializa Google Pay se for para o step de pagamento
        if (currentStep === 2) {
            setTimeout(() => {
                initializeGooglePay();
            }, 300);
        }
    }
}

function prevStep() {
    if (currentStep > 0) {
        showStep(currentStep - 1);
    }
}

function showStep(step) {
    // Esconde todos os steps
    document.querySelectorAll('.form-step').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('active');
    });
    
    // Mostra o step atual
    const currentStepEl = document.getElementById(`step-${step}`);
    if (currentStepEl) {
        currentStepEl.classList.remove('hidden');
        currentStepEl.classList.add('active');
    }
    
    // Atualiza a progress bar
    updateProgress(step);
    
    currentStep = step;
}

function updateProgress(step) {
    const steps = document.querySelectorAll('.progress-step');
    
    steps.forEach((stepEl, index) => {
        if (index <= step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });
}

// ==================== VALIDAÇÕES ====================
function validateCurrentStep(step) {
    switch(step) {
        case 0: // Carrinho
            const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            if (carrinho.length === 0) {
                alert('Seu carrinho está vazio. Adicione produtos antes de continuar.');
                return false;
            }
            return true;
            
        case 1: // Dados
            const email = document.getElementById('email');
            if (!email || !email.value.trim()) {
                alert('Por favor, informe um email válido.');
                email.focus();
                return false;
            }
            
            // Validação simples de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                alert('Por favor, informe um email válido.');
                email.focus();
                return false;
            }
            return true;
            
        case 2: // Pagamento
            const activeTab = document.querySelector('.payment-tab.active');
            if (!activeTab) {
                alert('Por favor, selecione um método de pagamento.');
                return false;
            }
            return true;
            
        case 3: // Confirmação
            const termsCheckbox = document.getElementById('terms');
            if (!termsCheckbox || !termsCheckbox.checked) {
                alert('Por favor, aceite os termos de serviço.');
                return false;
            }
            return true;
            
        default:
            return true;
    }
}

// ==================== ATUALIZAÇÃO DE RESUMOS ====================
function calcularTotalCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

function updateFinalSummary() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const total = calcularTotalCarrinho();
    const email = document.getElementById('email')?.value || '';
    
    // Atualiza resumo do produto
    const summaryProduct = document.getElementById('summary-product');
    if (summaryProduct && carrinho.length > 0) {
        if (carrinho.length === 1) {
            summaryProduct.textContent = carrinho[0].nome;
        } else {
            summaryProduct.textContent = `${carrinho.length} produtos`;
        }
    }
    
    // Atualiza total
    const summaryTotal = document.getElementById('summary-total');
    if (summaryTotal) {
        summaryTotal.textContent = `R$ ${total.toFixed(2)}`;
    }
    
    // Atualiza email
    const summaryEmail = document.getElementById('summary-email');
    if (summaryEmail) {
        summaryEmail.textContent = email;
    }
    
    // Atualiza método de pagamento
    const activeTab = document.querySelector('.payment-tab.active');
    if (activeTab) {
        updatePaymentSummary(activeTab.dataset.method);
    }
}

// ==================== PROCESSAMENTO DE PAGAMENTO ====================
function showPaymentSuccess() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const total = calcularTotalCarrinho();
    
    // Envia para histórico
    carrinho.forEach(item => {
        fetch('/api/historico-pagamento', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                produto: item.nome,
                valor: item.preco,
                quantidade: item.quantidade,
                total: total
            })
        }).catch(err => console.error('Erro ao salvar histórico:', err));
    });

    // Limpa carrinho após compra
    localStorage.removeItem("carrinho");
    
    // Atualiza a interface do step 3
    const step3 = document.getElementById('step-3');
    if (step3) {
        step3.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <div style="font-size: 4rem; color: #28a745; margin-bottom: 20px;">
                    ✅
                </div>
                <h2 style="color: #28a745; margin-bottom: 15px;">Pagamento Aprovado!</h2>
                <p style="color: #666; margin-bottom: 25px;">
                    Seu pagamento de <strong>R$ ${total.toFixed(2)}</strong> 
                    foi processado com sucesso.
                </p>
                <p style="color: #666; font-size: 14px; margin-bottom: 30px;">
                    Você receberá um email com as instruções de download em breve.
                </p>
                <button onclick="window.location.href='/conta/pedidos'" style="
                    background: #28a745;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                    font-weight: 600;
                    margin: 5px;
                ">
                    Ver Meus Pedidos
                </button>
                <button onclick="window.location.href='/produtos'" style="
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                    font-weight: 600;
                    margin: 5px;
                ">
                    Continuar Comprando
                </button>
            </div>
        `;
    }
}

// ==================== FINALIZAR COMPRA ====================
function finalizarCompra() {
    if (!validateCurrentStep(currentStep)) return;
    
    const activeTab = document.querySelector('.payment-tab.active');
    const paymentMethod = activeTab ? activeTab.dataset.method : 'google-pay';
    
    console.log('Finalizando compra com método:', paymentMethod);
    
    switch(paymentMethod) {
        case 'google-pay':
            // Aciona o botão do Google Pay
            const googlePayButton = document.querySelector('#google-pay-button button');
            if (googlePayButton) {
                googlePayButton.click();
            } else {
                // Fallback se o botão não estiver disponível
                handleFallbackGooglePay();
            }
            break;
            
        case 'pix':
            processPixPayment();
            break;
            
        default:
            alert('Método de pagamento não suportado.');
    }
}

function processPixPayment() {
    console.log('Processando pagamento PIX...');
    
    // Simula processamento PIX
    const loadingDiv = document.createElement('div');
    loadingDiv.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div class="spinner" style="border: 4px solid #f3f3f3; border-top: 4px solid #007bff; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 0 auto 20px;"></div>
            <p>Processando pagamento PIX...</p>
        </div>
    `;
    
    const step3 = document.getElementById('step-3');
    if (step3) {
        step3.querySelector('.form-actions').innerHTML = loadingDiv.outerHTML;
    }
    
    setTimeout(() => {
        showPaymentSuccess();
    }, 3000);
}

// ==================== INTEGRAÇÃO COM O CARRINHO ====================
// Função para atualizar o Google Pay quando o carrinho mudar
function atualizarGooglePay() {
    if (paymentsClient) {
        createGooglePayButton();
    }
}

// Observa mudanças no carrinho
const originalAtualizarCarrinho = window.atualizarCarrinho;
window.atualizarCarrinho = function() {
    if (originalAtualizarCarrinho) {
        originalAtualizarCarrinho();
    }
    atualizarGooglePay();
};

// Adiciona evento de submit para o formulário final
document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('.btn-submit');
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            finalizarCompra();
        });
    }
    
    // Inicializa Google Pay quando a página carrega
    setTimeout(() => {
        initializeGooglePay();
    }, 1000);
});

// Adiciona CSS para o spinner
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .google-pay-fallback-btn:hover {
        background: #333 !important;
    }
`;
document.head.appendChild(style);