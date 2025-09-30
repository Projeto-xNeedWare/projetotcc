// ==================== CONFIGURAÇÃO INICIAL ====================
let paymentsClient;
let currentStep = 1;
let selectedProduct = {
    id: 'message',
    name: 'xNeed Message',
    price: '59.00'
};

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
        allowedCardNetworks: ['MASTERCARD', 'VISA', 'AMEX']
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
    setupProductSelection();
    setupPaymentTabs();
    updateSidebar();
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// ==================== GOOGLE PAY ====================
function initializeGooglePay() {
    if (window.google && window.google.payments) {
        paymentsClient = new google.payments.api.PaymentsClient({
            environment: 'TEST'
        });

        const isReadyToPayRequest = {
            ...baseRequest,
            allowedPaymentMethods
        };

        paymentsClient.isReadyToPay(isReadyToPayRequest)
            .then(function(response) {
                if (response.result) {
                    createGooglePayButton();
                } else {
                    showGooglePayUnavailable();
                }
            })
            .catch(function(err) {
                showGooglePayUnavailable();
            });
    } else {
        setTimeout(initializeGooglePay, 100);
    }
}

function createGooglePayButton() {
    if (!paymentsClient) return;

    const paymentDataRequest = {
        ...baseRequest,
        allowedPaymentMethods,
        transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: selectedProduct.price,
            currencyCode: 'BRL',
            countryCode: 'BR'
        },
        merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'xNeedWare'
        }
    };

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
    }
}

function showGooglePayUnavailable() {
    const container = document.getElementById('google-pay-button');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 8px; color: #666;">
                <p>Google Pay não está disponível neste dispositivo</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">Use uma das outras opções de pagamento</p>
            </div>
        `;
    }
}

function handleGooglePayClick(paymentDataRequest) {
    paymentsClient.loadPaymentData(paymentDataRequest)
        .then(function(paymentData) {
            processGooglePayPayment(paymentData);
        })
        .catch(function(err) {
            alert('Erro ao processar pagamento. Tente novamente.');
        });
}

function processGooglePayPayment(paymentData) {
    showPaymentSuccess();
}

// ==================== SELEÇÃO DE PRODUTOS ====================
function setupProductSelection() {
    const productInputs = document.querySelectorAll('input[name="product"]');
    
    productInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                selectedProduct = {
                    id: this.value,
                    name: this.dataset.name,
                    price: this.dataset.price
                };
                
                updateSidebar();
                
                if (paymentsClient) {
                    createGooglePayButton();
                }
            }
        });
    });
}

// ==================== TABS DE PAGAMENTO ====================
function setupPaymentTabs() {
    const tabs = document.querySelectorAll('.payment-tab');
    const contents = document.querySelectorAll('.payment-method-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const method = this.dataset.method;
            
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            contents.forEach(content => content.classList.add('hidden'));
            
            const targetContent = document.getElementById(method + '-content');
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
            
            updatePaymentSummary(method);
        });
    });
}

function updatePaymentSummary(method) {
    const paymentNames = {
        'google-pay': 'Google Pay',
        'credit-card': 'Cartão de crédito',
        'pix': 'PIX',
    };
    
    const summaryPayment = document.getElementById('summary-payment');
    if (summaryPayment) {
        summaryPayment.textContent = paymentNames[method] || 'Google Pay';
    }
}

// ==================== ATUALIZAÇÃO DA INTERFACE ====================
function updateSidebar() {
    const sidebarProduct = document.getElementById('sidebar-product');
    const sidebarTotal = document.getElementById('sidebar-total');
    
    if (sidebarProduct) {
        sidebarProduct.textContent = selectedProduct.name;
    }
    
    if (sidebarTotal) {
        sidebarTotal.textContent = `R$ ${selectedProduct.price.replace('.', ',')}`;
    }
    
    const summaryProduct = document.getElementById('summary-product');
    const summaryTotal = document.getElementById('summary-total');
    
    if (summaryProduct) {
        summaryProduct.textContent = selectedProduct.name;
    }
    
    if (summaryTotal) {
        summaryTotal.textContent = `R$ ${selectedProduct.price.replace('.', ',')}`;
    }
}

// ==================== NAVEGAÇÃO ENTRE STEPS ====================
function nextStep(step) {
    if (!validateCurrentStep(step)) return;
    
    const currentStepEl = document.getElementById(`step-${step}`);
    const nextStepEl = document.getElementById(`step-${step + 1}`);
    
    if (currentStepEl && nextStepEl) {
        currentStepEl.classList.add('hidden');
        nextStepEl.classList.remove('hidden');
        updateProgress(step + 1);
        currentStep = step + 1;
        
        if (step + 1 === 4) {
            updateFinalSummary();
        }
    }
}

function prevStep(step) {
    const currentStepEl = document.getElementById(`step-${step}`);
    const prevStepEl = document.getElementById(`step-${step - 1}`);
    
    if (currentStepEl && prevStepEl) {
        currentStepEl.classList.add('hidden');
        prevStepEl.classList.remove('hidden');
        updateProgress(step - 1);
        currentStep = step - 1;
    }
}

function updateProgress(step) {
    const steps = document.querySelectorAll('.progress-step');
    
    steps.forEach((stepEl, index) => {
        if (index < step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });
}

// ==================== VALIDAÇÕES ====================
function validateCurrentStep(step) {
    switch(step) {
        case 1:
            const selectedProductInput = document.querySelector('input[name="product"]:checked');
            if (!selectedProductInput) {
                alert('Por favor, selecione um produto.');
                return false;
            }
            return true;
            
        case 3:
            const activeTab = document.querySelector('.payment-tab.active');
            if (!activeTab) {
                alert('Por favor, selecione um método de pagamento.');
                return false;
            }
            
            if (activeTab.dataset.method === 'credit-card') {
                const cardFields = ['card-number', 'card-name', 'card-expiry', 'card-cvv'];
                for (let field of cardFields) {
                    const input = document.getElementById(field);
                    if (!input || !input.value.trim()) {
                        alert('Por favor, preencha todos os campos do cartão.');
                        return false;
                    }
                }
            }
            return true;
            
        default:
            return true;
    }
}

function updateFinalSummary() {
    updateSidebar();
    
    const activeTab = document.querySelector('.payment-tab.active');
    if (activeTab) {
        updatePaymentSummary(activeTab.dataset.method);
    }
}

// ==================== PROCESSAMENTO DE PAGAMENTO ====================
function showPaymentSuccess() {
    nextStep(4);

    // Enviar para histórico (mantido igual)
    fetch('../../public/historico-pagamento.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `produto=${encodeURIComponent(selectedProduct.name)}&valor=${encodeURIComponent(selectedProduct.price)}`
    });

    const step4 = document.getElementById('step-4');
    step4.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 4rem; color: #28a745; margin-bottom: 20px;">
                ✅
            </div>
            <h2 style="color: #28a745; margin-bottom: 15px;">Pagamento Aprovado!</h2>
            <p style="color: #666; margin-bottom: 25px;">
                Seu pagamento de <strong>R$ ${selectedProduct.price.replace('.', ',')}</strong> 
                para <strong>${selectedProduct.name}</strong> foi processado com sucesso.
            </p>
            <p style="color: #666; font-size: 14px; margin-bottom: 30px;">
                Você receberá um email com as instruções de download em breve.
            </p>
            <button onclick="window.location.href='/produtos'" style="
                background: #28a745;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 6px;
                font-size: 16px;
                cursor: pointer;
                font-weight: 600;
            ">
                Voltar aos Produtos
            </button>
        </div>
    `;
}

// ==================== SUBMISSÃO DO FORMULÁRIO ====================
document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        alert('Por favor, aceite os termos de serviço.');
        return;
    }
    
    const activeTab = document.querySelector('.payment-tab.active');
    const paymentMethod = activeTab ? activeTab.dataset.method : 'google-pay';
    
    switch(paymentMethod) {
        case 'google-pay':
            alert('Use o botão Google Pay para finalizar o pagamento.');
            break;
            
        case 'credit-card':
            processCardPayment();
            break;
            
        case 'pix':
            processPixPayment();
            break;
    }
});

function processCardPayment() {
    setTimeout(() => {
        showPaymentSuccess();
    }, 2000);
}

function processPixPayment() {
    // Função mantida para compatibilidade
    setTimeout(() => {
        showPaymentSuccess();
    }, 2000);
}