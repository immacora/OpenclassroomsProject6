/* CONSTANTES du DOM */
const headerBurger = document.querySelector('.menu__burger');
const headerBurgerClose = document.querySelector('.menu__burger__close');
const mobileNav = document.querySelector('.header__nav__menu');

/* ECOUTEURS D'EVENEMENTS */
headerBurger.addEventListener('click', openMobileMenu);
headerBurgerClose.addEventListener('click', closeMobileMenu);

/* FONCTIONS */

// Ajoute la classe "open" au memu de navigation et affiche le headerBurgerClose.
function openMobileMenu() {
    mobileNav.classList.add('open');
    headerBurger.style.display = 'none';
    headerBurgerClose.style.display = 'block';
}

// Enlève la classe "open" du memu de navigation et cache le headerBurgerClose.
function closeMobileMenu() {
    mobileNav.classList.remove('open');
    headerBurgerClose.style.display = 'none';
    headerBurger.style.display = 'block';
}