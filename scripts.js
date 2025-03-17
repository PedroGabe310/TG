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

document.addEventListener('DOMContentLoaded', function () {
  const depoimentos = document.querySelectorAll('.depoimento');
  const btnAnterior = document.querySelector('.anterior');
  const btnProximo = document.querySelector('.proximo');
  let currentIndex = 0;

  function mostrarDepoimento(index) {
      depoimentos.forEach((depoimento, i) => {
          depoimento.classList.remove('ativo');
          if (i === index) {
              depoimento.classList.add('ativo');
          }
      });
  }
  mostrarDepoimento(currentIndex);

  btnProximo.addEventListener('click', function () {
      currentIndex = (currentIndex + 1) % depoimentos.length;
      mostrarDepoimento(currentIndex);
  });

  btnAnterior.addEventListener('click', function () {
      currentIndex = (currentIndex - 1 + depoimentos.length) % depoimentos.length;
      mostrarDepoimento(currentIndex);
  });

  const botoesCurtir = document.querySelectorAll('.btn-curtir');

  botoesCurtir.forEach(botao => {
      botao.addEventListener('click', function () {
          let contador = parseInt(this.querySelector('.contador').textContent);
          contador++;
          this.querySelector('.contador').textContent = contador;
          localStorage.setItem('curtidas', contador);
      });
  });
});
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

