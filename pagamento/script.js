function voltarPagina() {
    window.history.back();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const botaoPagar = document.querySelector(".botao-pagar");
  
    botaoPagar.addEventListener("click", () => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer abc_dev_MzFxujDXwr2KYQELUM33KLq1',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          frequency: "MULTIPLE_PAYMENTS",
          methods: ["PIX"],
          products: [
            {
              externalId: "prod-1234",
              name: "Cobrança teste",
              quantity: 1,
              description: "Testando uma nova cobrança",
              price: 500
            }
          ],
          returnUrl: "https://projeto-xneedware.github.io/projetotcc/pagamento/",
          completionUrl: "https://projeto-xneedware.github.io/projetotcc/pagamento/",
          customer: {
            name: "Gabriel Marin",
            cellphone: "19997615610",
            email: "gabrielmloquetti@gmail.com",
            taxId: "51847974830"
          }
        })
      };
  
      fetch('https://api.abacatepay.com/v1/billing/create', options)
        .then(response => response.json())
        .then(data => {
          if (data && data.paymentUrl) {
            window.location.href = data.paymentUrl;
          } else {
            alert("Erro ao gerar link de pagamento.");
            console.error("Resposta da API:", data);
          }
        })
        .catch(err => {
          alert("Erro ao processar o pagamento.");
          console.error(err);
        });
    });
  });
  