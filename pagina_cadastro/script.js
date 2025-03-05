var lineRoundedCloseIcon = document.getElementById("lineRoundedCloseIcon");
    		if(lineRoundedCloseIcon) {
      			lineRoundedCloseIcon.addEventListener("click", function (e) {
                    window.history.back();
      			});
    		}

			function toggleCheckbox() {
				let checkbox = document.querySelector(".checkbox");
				checkbox.classList.toggle("checked");
			  }

			function fazerCadastro() {
				alert("Botão de cadastro clicado!");
				// Redirecionar para outra página
				// window.location.href = "pagina_de_cadastro.html";
			  }