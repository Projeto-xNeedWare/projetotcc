var voltarInicio = document.getElementById("voltarInicio");
			if (voltarInicio) {
				voltarInicio.addEventListener("click", function () {
					window.history.back(); 
				});
			}

    		var xNeedWareText = document.getElementById("xNeedWareText");
			if(xNeedWareText) {
				xNeedWareText.addEventListener("click", function (e) {
					e.preventDefault();
					window.open("main_page/index.html");
				});
			}