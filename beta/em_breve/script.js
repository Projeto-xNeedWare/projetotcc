// Função para adicionar evento de clique em botões
function addClickEvent(selector, url) {
	var elements = document.querySelectorAll(selector); // Usa querySelectorAll para pegar todos os elementos
	elements.forEach(function (element) {
	  element.addEventListener("click", function () {
		window.location.href = url; // Redireciona para a URL
	  });
	});
  }

addClickEvent(".texto_novos_projetos", "../Dev_About/index.html"); // Adiciona evento de clique para os botões com a classe "botao"





var voltarInicio = document.getElementById("voltarInicio");
			if (voltarInicio) {
				voltarInicio.addEventListener("click", function () {
					window.history.back(); 
				});
			}

    		var xneedware = document.getElementById("texto_xNeedWare");
if (xneedware) {
    xneedware.addEventListener("click", function (e) { // Use "xneedware" aqui
        e.preventDefault();
        window.location.href = "../pagina_inicial/index.html"; // Melhor alternativa para redirecionamento
    });
}



//Pega um biblioteca JQuery para executar o que estiver dentro da função 
			// e inicializa variáveis que serão usadas ao longo do código
			$(function(){

				var canvas, gl,
					ratio,
					vertices,
					velocities,
					freqArr,
					cw,
					ch,
					colorLoc,
					thetaArr,
					velThetaArr,
					velRadArr,
					boldRateArr,
					drawType = 0,
					numLines = 40000,
					iconNumLines = 40000,
					contentWidth,
					contentHeight,
					canvasSpace,
					canvas2,
					ctx2,
					ctx,
					maxStars = 300;
				starsCount = 0,
					stars = [],
					hue = 217;
				
				var target = [];
				var iconTarget = [];
				var randomTargetXArr = [],
					randomTargetYArr = [];
				var requestAnimationFrameId;
				var coefficient = .4;
				var targetCoefficient = .02;
				
				//Chama a função que pega elementos do canvas que configura a tela onde vai acontecer a animação
				function initAnimationScene() {

					//Pega o lugar do html que será colocada a função, pelo ID

					canvas = document.getElementById("animation-canvas");

					//Pega variáveis criadas nas funções de cima e adiciona novas coisas

					contentWidth = canvas.parentNode.offsetWidth;
					contentHeight = canvas.parentNode.offsetHeight;

					//Pega o conteudo das variáveis de cima, e adiciona as de baixo

					canvas.width = contentWidth;
					canvas.height = contentHeight;
					//Primeiro pega a div criada no html, e adiciona numa variável
					//Pega a variável criada já pronta na biblioteca e modifica os parâmetros de Largura (width), e Altura (height)

					canvasSpace = document.getElementById("animation-space-canvas");
					canvasSpace.width = contentWidth;
					canvasSpace.height = contentHeight;

					//Inicia a função

					initStarsAnimation();
					startStarsAnimation();
				}
				
					//Indica quando as estrelas devem começar a aparecer 

				function timer() {
					if (drawType < 2) {
						drawType += 1;
				
						if (drawType < 2) {
							setTimeout(timer, 1500);
						} else {
							setTimeout(timer, 1200);
						}
						return;
					}
				
					if (drawType == 2) {
						canvas.parentNode.className += ' active';
						startStarsAnimation();
						drawIconScene();
					}
				}
				
				function random(min, max) {
					if (arguments.length < 2) {
						max = min;
						min = 0;
					}
					if (min > max) {
						var hold = max;
						max = min;
						min = hold;
					}
					return Math.floor(Math.random() * (max - min + 1)) + min;
				}
				
				//Pega as 4 medidas da página para a órbita das estrelas não ficar maior que a tela

				function maxOrbit(x, y) {
					var max = Math.max(x, y),
						diameter = Math.round(Math.sqrt(max * max + max * max));
					return diameter / 2;
				}
				
				

				var Star = function() {
					this.orbitRadius = random(maxOrbit(contentWidth, contentHeight));
					this.radius = random(60, this.orbitRadius) / 10;

					//Pega as medidas de altura e largura para centralizar a animação

					this.orbitX = contentWidth / 2;
					this.orbitY = contentHeight / 2;

					//Ajusta a velocidade da animação

					this.timePassed = random(0, maxStars);//Tempo que passou desde que a função começou
					this.speed = random(this.orbitRadius) / 200000;
					this.alpha = random(2, 10) / 10;
					starsCount++;
					stars[starsCount] = this;
				}
				
				

				Star.prototype.draw = function() {
					//Pega a variável criada para verificar o tempo que passou e multiplica com os parêmtros da estrela
					var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
						y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
						twinkle = random(10);
					if (twinkle === 1 && this.alpha > 0) {
						this.alpha -= 0.05;
					} else if (twinkle === 2 && this.alpha < 1) {
						this.alpha += 0.05;
					}
					ctx.globalAlpha = this.alpha;
					// Desenha a estrela com um pré gradiente do canvas
					ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);

					//Atualiza o tempo que passou e coloca na estrela
					this.timePassed += this.speed;
				}
				
				function starsAnimation() {
					ctx.clearRect(0, 0, contentWidth, contentHeight);
					ctx.globalCompositeOperation = 'source-over';
					ctx.globalAlpha = 0.8;
					ctx.fillStyle = 'transparent';
					ctx.fillRect(0, 0, contentWidth, contentHeight);

					//Ajusta a sobreposição de cores
					ctx.globalCompositeOperation = 'lighter';

					//Itera sobre cada estrela e chama a função para desenhar ela

					for (var i = 1, l = stars.length; i < l; i++) {
						stars[i].draw();
					};
					//Chama a função starsAnimation novamente para se o navegador atualizar
					requestAnimationFrame(starsAnimation);
				}
				
				function initCanvasCachedGradient() {
					//Função que cria um gradiente para as estrelas
					canvas2 = document.createElement('canvas');
					var w2 = canvas2.width = 100;
					var h2 = canvas2.height = 100;
					ctx2 = canvas2.getContext("2d");
					var gradientCache = ctx2.createRadialGradient(
						w2 / 2,
						h2 / 2,
						0,
						w2 / 2,
						h2 / 2,
						w2 / 2
					);
					gradientCache.addColorStop(0.025, 'rgba(255, 255, 255, 1)');
					gradientCache.addColorStop(0.1, 'rgba(255, 255, 255, 0.2)');
					gradientCache.addColorStop(0.25, 'rgba(255, 255, 255, 0.07)');
					gradientCache.addColorStop(1, 'transparent');
					ctx2.fillStyle = gradientCache;
					ctx2.beginPath();
					ctx2.arc(w2 / 2, h2 / 2, w2 / 2, 0, Math.PI * 2);
					ctx2.fill();
					// Termina o gradiente
				}
				
				function initStarsAnimation() {

					//Inicia um novo objeto para pegar a função de desenho e realizar a pré renderização
					ctx = canvasSpace.getContext('2d');
					for (var i = 0; i < maxStars; i++) {
						new Star();
					}
					//Pega a função de gradiente criada acima e inicia aqui
					initCanvasCachedGradient();
				}
				
				//Cria uma funçção de inicialização para iniciar a função para iniciar a animação
				function startStarsAnimation() {
					starsAnimation();
				}
				
				function onResizeHandler(event) {
					contentWidth = canvas.parentNode.offsetWidth;
					contentHeight = canvas.parentNode.offsetHeight;
				
					canvas.width = contentWidth;
					canvas.height = contentHeight;
				
					canvasSpace.width = contentWidth;
					canvasSpace.height = contentHeight;
				}
				
				$(function(event, data) {
					//Inicia a ação das estrelas
					initAnimationScene();
				});
				
				});