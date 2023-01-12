/* CONSTANTES du DOM */
const headerBurger = document.querySelector('.header__burger');
const headerBurgerClose = document.querySelector('.header__burger__close');

/* ECOUTEURS D'EVENEMENTS */
headerBurger.addEventListener('click', openMobileMenu);
headerBurgerClose.addEventListener('click', closeMobileMenu);


/* FONCTIONS */

/* Ajoute la classe "open" au memu (classe header__nav). */
function openMobileMenu() {
    document.querySelector('.header__nav').classList.add('open');
}

/* Enlève la classe "open" du memu (classe header__nav). */
function closeMobileMenu() {
    document.querySelector('.header__nav').classList.remove('open');
}