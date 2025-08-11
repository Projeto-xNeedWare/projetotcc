// Configuração do Google Pay
let paymentsClient;
let currentStep = 1;
let selectedProduct = {
    id: '',
    name: '',
    price: '00.00'
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
            gateway: 'example', // Substitua pelo seu gateway
            gatewayMerchantId: 'exampleGatewayMerchantId' // Substitua pelo seu merchant ID
        }
    }
}];

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initializeGooglePay();
    setupProductSelection();
    setupPaymentTabs();
    updateSidebar();
    
    // Definir ano atual no footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Inicializar Google Pay
function initializeGooglePay() {
    if (window.google && window.google.payments) {
        paymentsClient = new google.payments.api.PaymentsClient({
            environment: 'TEST' // Mude para 'PRODUCTION' em produção
        });

        // Verificar se Google Pay está disponível
        const isReadyToPayRequest = {
            ...baseRequest,
            allowedPaymentMethods
        };

        paymentsClient.isReadyToPay(isReadyToPayRequest)
            .then(function(response) {
                if (response.result) {
                    console.log('Google Pay está disponível');
                    createGooglePayButton();
                } else {
                    console.log('Google Pay não está disponível');
                    showGooglePayUnavailable();
                }
            })
            .catch(function(err) {
                console.error('Erro ao verificar Google Pay:', err);
                showGooglePayUnavailable();
            });
    } else {
        setTimeout(initializeGooglePay, 100);
    }
}

// Criar botão do Google Pay
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
            merchantId: '12345678901234567890', // Substitua pelo seu merchant ID
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
        }
    } catch (error) {
        console.error('Erro ao criar botão Google Pay:', error);
        showGooglePayUnavailable();
    }
}

// Mostrar mensagem quando Google Pay não está disponível
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

// Processar clique no Google Pay
function handleGooglePayClick(paymentDataRequest) {
    paymentsClient.loadPaymentData(paymentDataRequest)
        .then(function(paymentData) {
            console.log('Dados de pagamento recebidos:', paymentData);
            processGooglePayPayment(paymentData);
        })
        .catch(function(err) {
            console.error('Erro no pagamento:', err);
            alert('Erro ao processar pagamento. Tente novamente.');
        });
}

// Processar pagamento do Google Pay
function processGooglePayPayment(paymentData) {
    // Aqui você enviaria os dados para seu servidor
    console.log('Processando pagamento Google Pay para:', selectedProduct);
    console.log('Dados do pagamento:', paymentData);

    // Simular processamento
    showPaymentSuccess();
}

// Mostrar sucesso do pagamento
function showPaymentSuccess() {
    // Ir para o step final
    nextStep(4);
    
    // Mostrar mensagem de sucesso
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
            <button onclick="window.location.href='../produtos/index.html'" style="
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

// Configurar seleção de produtos
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
                
                // Recriar botão Google Pay com novo preço
                if (paymentsClient) {
                    createGooglePayButton();
                }
            }
        });
    });
}

// Configurar tabs de pagamento
function setupPaymentTabs() {
    const tabs = document.querySelectorAll('.payment-tab');
    const contents = document.querySelectorAll('.payment-method-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const method = this.dataset.method;
            
            // Remover classe active de todas as tabs
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Esconder todos os conteúdos
            contents.forEach(content => content.classList.add('hidden'));
            
            // Mostrar conteúdo selecionado
            const targetContent = document.getElementById(method + '-content');
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
            
            // Atualizar resumo de pagamento
            updatePaymentSummary(method);
        });
    });
}

// Atualizar resumo de pagamento
function updatePaymentSummary(method) {
    const paymentNames = {
        'google-pay': 'Google Pay',
        'credit-card': 'Cartão de crédito',
        'pix': 'PIX',
        'boleto': 'Boleto bancário'
    };
    
    const summaryPayment = document.getElementById('summary-payment');
    if (summaryPayment) {
        summaryPayment.textContent = paymentNames[method] || 'Google Pay';
    }
}

// Atualizar sidebar
function updateSidebar() {
    const sidebarProduct = document.getElementById('sidebar-product');
    const sidebarTotal = document.getElementById('sidebar-total');
    
    if (sidebarProduct) {
        sidebarProduct.textContent = selectedProduct.name;
    }
    
    if (sidebarTotal) {
        sidebarTotal.textContent = `R$ ${selectedProduct.price.replace('.', ',')}`;
    }
    
    // Atualizar resumo final também
    const summaryProduct = document.getElementById('summary-product');
    const summaryTotal = document.getElementById('summary-total');
    
    if (summaryProduct) {
        summaryProduct.textContent = selectedProduct.name;
    }
    
    if (summaryTotal) {
        summaryTotal.textContent = `R$ ${selectedProduct.price.replace('.', ',')}`;
    }
}

// Navegação entre steps
function nextStep(step) {
    // Validar step atual antes de prosseguir
    if (!validateCurrentStep(step)) {
        return;
    }
    
    const currentStepEl = document.getElementById(`step-${step}`);
    const nextStepEl = document.getElementById(`step-${step + 1}`);
    
    if (currentStepEl && nextStepEl) {
        currentStepEl.classList.add('hidden');
        nextStepEl.classList.remove('hidden');
        
        // Atualizar progress
        updateProgress(step + 1);
        currentStep = step + 1;
        
        // Se chegou no step 4, atualizar resumo
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
        
        // Atualizar progress
        updateProgress(step - 1);
        currentStep = step - 1;
    }
}

// Atualizar barra de progresso
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

// Validar step atual
function validateCurrentStep(step) {
    switch(step) {
        case 1:
            // Verificar se um produto foi selecionado
            const selectedProductInput = document.querySelector('input[name="product"]:checked');
            if (!selectedProductInput) {
                alert('Por favor, selecione um produto.');
                return false;
            }
            return true;
            
        case 2:
            // Validar campos obrigatórios
            const requiredFields = ['name', 'email', 'cpf', 'phone'];
            for (let field of requiredFields) {
                const input = document.getElementById(field);
                if (!input || !input.value.trim()) {
                    alert(`Por favor, preencha o campo ${field}.`);
                    return false;
                }
            }
            return true;
            
        case 3:
            // Validar método de pagamento selecionado
            const activeTab = document.querySelector('.payment-tab.active');
            if (!activeTab) {
                alert('Por favor, selecione um método de pagamento.');
                return false;
            }
            
            // Se for cartão de crédito, validar campos
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

// Atualizar resumo final
function updateFinalSummary() {
    updateSidebar();
    
    // Atualizar método de pagamento no resumo
    const activeTab = document.querySelector('.payment-tab.active');
    if (activeTab) {
        updatePaymentSummary(activeTab.dataset.method);
    }
}

// Submissão do formulário
document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Verificar se os termos foram aceitos
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        alert('Por favor, aceite os termos de serviço.');
        return;
    }
    
    // Processar pagamento baseado no método selecionado
    const activeTab = document.querySelector('.payment-tab.active');
    const paymentMethod = activeTab ? activeTab.dataset.method : 'google-pay';
    
    switch(paymentMethod) {
        case 'google-pay':
            // Google Pay já foi processado
            alert('Use o botão Google Pay para finalizar o pagamento.');
            break;
            
        case 'credit-card':
            processCardPayment();
            break;
            
        case 'pix':
            processPixPayment();
            break;
            
        case 'boleto':
            processBoletoPayment();
            break;
    }
});

// Processar pagamento com cartão
function processCardPayment() {
    // Simular processamento
    console.log('Processando pagamento com cartão...');
    setTimeout(() => {
        showPaymentSuccess();
    }, 2000);
}

// Processar pagamento PIX
function processPixPayment() {
    console.log('Gerando QR Code PIX...');
    setTimeout(() => {
        showPaymentSuccess();
    }, 1000);
}

// Processar pagamento boleto
function processBoletoPayment() {
    console.log('Gerando boleto...');
    setTimeout(() => {
        showPaymentSuccess();
    }, 1000);
}

// Máscaras para campos
document.addEventListener('DOMContentLoaded', function() {
    // Máscara CPF
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            this.value = value;
        });
    }
    
    // Máscara CNPJ
    const cnpjInput = document.getElementById('cnpj');
    if (cnpjInput) {
        cnpjInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
            this.value = value;
        });
    }
    
    // Máscara telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d{4})$/, '$1-$2');
            this.value = value;
        });
    }
    
    // Máscara cartão
    const cardInput = document.getElementById('card-number');
    if (cardInput) {
        cardInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            this.value = value;
        });
    }
    
    // Máscara validade
    const expiryInput = document.getElementById('card-expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d)/, '$1/$2');
            this.value = value;
        });
    }
});
