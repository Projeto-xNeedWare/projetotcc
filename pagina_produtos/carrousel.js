//Inicia uma var com 0, e index, que irá servir para contagem
let slideIndex = 0;

showSlides();

//Função para o próximo slide
function nextSlide() {
  slideIndex++; //Incrementa 1 ao indice
  showSlides(); //Atualiza a imagem do slide á seguir
  timer = _timer; //Reseta o índice
}

//Função para voltar para o slide anterior
function prevSlide() {
  slideIndex--;
  showSlides();
  timer = _timer;
}


//Função para escolher o slide que deseja
function currentSlide(n) {
  slideIndex = n - 1;
  showSlides();
  timer = _timer;
}

//Função para exibir os slides
function showSlides() {
  let slides = document.querySelectorAll(".mySlides");
  let dots = document.querySelectorAll(".dots");

  if (slideIndex > slides.length - 1) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  
  // hide all slides
  slides.forEach((slide) => {
    slide.style.display = "none";
  });
  
  // show one slide base on index number
  slides[slideIndex].style.display = "block";
  
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });
  
  dots[slideIndex].classList.add("active");
}

//Função para o slide passe sozinho, sem o usuário fazer alterações
let timer = 20; // sec
const _timer = timer;

//Executa a função a cada 1 minuto
setInterval(() => {
  timer--;

  if (timer < 1) {
    nextSlide();
    timer = _timer; 
  }
}, 1000); // 1sec