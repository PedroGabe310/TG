// Função para abrir/fechar o menu lateral
function toggleMenu() {
  const menuLateral = document.getElementById("menuLateral");
  menuLateral.classList.toggle("active");
}

// Lógica do Carrossel de Produtos
let slideIndex = 0;

function mostrarSlide() {
  const slides = document.querySelectorAll(".carrossel .slide");
  const slidesContainer = document.querySelector(".slides-container");

  slides.forEach((slide) => slide.classList.remove("active"));
  slides[slideIndex].classList.add("active");

  slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
}

function mudarSlide(n) {
  const slides = document.querySelectorAll(".carrossel .slide");
  slideIndex += n;

  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  mostrarSlide();
}

mostrarSlide();

// Auto-play (opcional)
setInterval(() => mudarSlide(1), 5000);

// Lógica do Carrossel de Depoimentos
let depoimentoIndex = 0;

function mostrarDepoimento() {
  const depoimentos = document.querySelectorAll(".depoimento-slide");

  depoimentos.forEach((depoimento) => depoimento.classList.remove("active"));
  depoimentos[depoimentoIndex].classList.add("active");
}

function mudarDepoimento(n) {
  const depoimentos = document.querySelectorAll(".depoimento-slide");
  depoimentoIndex += n;

  if (depoimentoIndex >= depoimentos.length) depoimentoIndex = 0;
  if (depoimentoIndex < 0) depoimentoIndex = depoimentos.length - 1;

  mostrarDepoimento();
}

mostrarDepoimento();

// Auto-play (opcional)
setInterval(() => mudarDepoimento(1), 5000);

// Lógica do Botão Curtir
function curtirDepoimento(index) {
  const contador = document.querySelectorAll(".btn-curtir .contador")[index];
  let curtidas = parseInt(localStorage.getItem(`curtidas-${index}`)) || 0;
  curtidas++;
  localStorage.setItem(`curtidas-${index}`, curtidas);
  contador.textContent = curtidas;
}

// Carrega as curtidas salvas ao carregar a página
window.addEventListener("load", () => {
  const contadores = document.querySelectorAll(".btn-curtir .contador");
  contadores.forEach((contador, index) => {
    const curtidas = parseInt(localStorage.getItem(`curtidas-${index}`)) || 0;
    contador.textContent = curtidas;
  });
});

