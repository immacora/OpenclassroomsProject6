/* FONCTIONS liées à l'événement onclick sur la classe header__burger du DOM*/


/* Ajoute la classe "open" au memu (classe header__nav). */
function openMobileMenu() {
    document.querySelector('.header__nav').classList.add('open');
}


/* Enlève la classe "open" du memu (classe header__nav). */
function closeMobileMenu() {
    document.querySelector('.header__nav').classList.remove('open');
}