//Essa sessão cuida totalmente da interação dentro do formulario, como alteração de produtos.
        
        // Funções para navegação entre etapas do formulário
        function nextStep(currentStep) {
            document.getElementById(`step-${currentStep}`).classList.add('hidden');
            document.getElementById(`step-${currentStep + 1}`).classList.remove('hidden');
            
            // Atualiza a barra de progresso
            const steps = document.querySelectorAll('.progress-step');
            steps[currentStep].classList.add('active');
        }
        
        function prevStep(currentStep) {
            document.getElementById(`step-${currentStep}`).classList.add('hidden');
            document.getElementById(`step-${currentStep - 1}`).classList.remove('hidden');
            
            // Atualiza a barra de progresso
            const steps = document.querySelectorAll('.progress-step');
            steps[currentStep - 1].classList.remove('active');
        }
        
        // Alternar entre métodos de pagamento
        document.addEventListener('DOMContentLoaded', function() {
            const paymentTabs = document.querySelectorAll('.payment-tab');
            
            // teste fazendskd 
            paymentTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    paymentTabs.forEach(t => t.classList.remove('active'));
                    
                    this.classList.add('active');
                    
                    // Esconde todos os conteúdos
                    const contents = document.querySelectorAll('.payment-method-content');
                    contents.forEach(content => content.classList.add('hidden'));
                    
                    // Mostra o conteúdo correspondente à aba clicada
                    const method = this.getAttribute('data-method');
                    document.getElementById(`${method}-content`).classList.remove('hidden');
                    
                    // Atualiza o resumo
                    document.getElementById('summary-payment').textContent = this.textContent;
                });
            });
            
            // Atualiza o resumo quando o producto é alterado
            const productOptions = document.querySelectorAll('input[name="product"]');
            productOptions.forEach(option => {
                option.addEventListener('change', function() {
                    const productName = document.querySelector(`label[for="${this.id}"] h3`).textContent;
                    document.getElementById('summary-product').textContent = productName;
                    document.getElementById('sidebar-product').textContent = productName;
                    
                    // Atualiza o preço baseado no producto selecionado
                    updatePrice();
                });
            });
            
            // Função para atualizar o preço baseado no producto e ciclo selecionados
            
            function updatePrice() {
                const selectedPlan = document.querySelector('input[name="product"]:checked').value;
                
                let price = 0;
                
                switch(selectedPlan) {
                    case 'chatbot':
                        document.getElementById('sidebar-product').innerHTML = `
                            <img src="assets/chatbot.png" alt="ChatBot" class="product-image" style="width: 300px; height: 200px; border-radius: 8px; object-fit: cover;">
                        `;
                        price = 99.00;
                        break;
                    case 'downloader':
                        document.getElementById('sidebar-product').innerHTML = `
                            <img src="assets/downloader.png" alt="Downloader" class="product-image" style="width: 300px; height: 200px; border-radius: 8px; object-fit: cover;">
                        `;
                        price = 39.00;
                        break;
                    
                    case 'message':
                        document.getElementById('sidebar-product').innerHTML = `
                            <img src="assets/message.png" alt="Message" class="product-image" style="width: 300px; height: 300px; border-radius: 8px; object-fit: cover;">
                        `;
                        price = 59.00;
                        break;
                    case 'qr_code':
                        document.getElementById('sidebar-product').innerHTML = `
                            <img src="assets/qrcodegenerator.png" alt="QR Code" class="product-image" style="width: 300px; height: 200px; border-radius: 8px; object-fit: cover;">
                        `;
                        price = 9.90;
                        break;
                    case 'excel':
                        document.getElementById('sidebar-product').innerHTML = `
                            <img src="assets/graphics.png" alt="Excel" class="product-image" style="width: 300px; height: 200px; border-radius: 8px; object-fit: cover;">
                        `;
                        price = 49.90;
                        break;
                }
                
                let total = price;
                
                // Atualiza os valores no resumo
                document.getElementById('summary-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
                document.getElementById('sidebar-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
            }
            
            // Inicializa o formulário
            document.getElementById('payment-form').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Pagamento processado com sucesso! Obrigado por comprar com a xNeedWare.');
            });
        });
    
 