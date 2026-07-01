AOS.init({ duration: 700, once: true, offset: 80 });

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
});

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const bars       = hamburger.querySelectorAll('span');
let menuOpen     = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  bars[0].style.transform = menuOpen ? 'translateY(7px) rotate(45deg)' : '';
  bars[1].style.opacity   = menuOpen ? '0' : '1';
  bars[2].style.transform = menuOpen ? 'translateY(-7px) rotate(-45deg)' : '';
});

document.querySelectorAll('#mobile-menu a').forEach(l => l.addEventListener('click', () => {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  bars[0].style.transform = '';
  bars[1].style.opacity   = '1';
  bars[2].style.transform = '';
}));

const modalOverlay = document.getElementById('modal-overlay');
const modalClose   = document.getElementById('modal-close');
const modalImg     = document.getElementById('modal-img');
const modalTitle   = document.getElementById('modal-title');
const modalDesc    = document.getElementById('modal-desc');
const modalTags    = document.getElementById('modal-tags');
const modalLink    = document.getElementById('modal-link');

function abrirModal(boton) {
  const titulo      = boton.dataset.title;
  const descripcion = boton.dataset.desc;
  const imagen      = boton.dataset.img;
  const tags        = boton.dataset.tags.split(',');
  const link        = boton.dataset.link;

  modalImg.src       = imagen;
  modalImg.alt       = titulo;
  modalTitle.textContent = titulo;
  modalDesc.textContent  = descripcion;
  modalTags.innerHTML = tags
    .map(tag => `<span class="modal-tag">${tag.trim()}</span>`)
    .join('');

  // Solo mostrar el botón si hay un link real (no vacío ni placeholder)
  const linkValido = link && link.trim() !== '' && !link.includes('Proximamente-video-demo');

  if (linkValido) {
    modalLink.href = link;
    modalLink.style.display = 'inline-flex'; // usa el display que ya tenga tu CSS
  } else {
    modalLink.removeAttribute('href');
    modalLink.style.display = 'none';
  }

  modalOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  modalOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

// Asignar el evento click a TODOS los botones "Ver Demo"
document.querySelectorAll('button[data-modal]').forEach(boton => {
  boton.addEventListener('click', () => abrirModal(boton));
});

// Cerrar con el botón X
modalClose.addEventListener('click', cerrarModal);

// Cerrar al hacer click en el fondo oscuro (fuera de la caja)
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) cerrarModal();
});

// Cerrar con la tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarModal();
});

//Formulario con Formspree 
const formulario = document.getElementById('contact-form');

formulario.addEventListener('submit', function() {
  const nombre = document.getElementById('nombre').value.trim();
  guardar('lastContact', { nombre, fecha: new Date().toISOString() });
});

function mostrarToast(texto) {
  const toast = document.getElementById('toast');
  toast.textContent = '✓  ' + texto;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}
function leer(clave, porDefecto = null) {
  const item = localStorage.getItem(clave);
  return item ? JSON.parse(item) : porDefecto;
}

window.addEventListener('DOMContentLoaded', () => {
  const last = leer('lastContact');
  if (last?.nombre) {
    campoNombre.placeholder = `Hola de nuevo, ${last.nombre} 👋`;
  }
});
