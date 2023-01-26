import { categories } from './category.js';

/* CAROUSEL */


/**
 * Active l'item du carousel.
 * Retive le display "none" et ajoute la classe active à l'item.
 * @param { Object } carouselDomItem
 */
function activateCarouselItem (carouselDomItem) {
    carouselDomItem.removeAttribute('style');
    carouselDomItem.classList.add('active');
}

/**
 * Désactive l'item du carousel.
 * Ajoute le display "none" et retire la classe la classe "active"à l'item.
 * @param { Object } carouselDomItems
 */
function disableCarouselItem (carouselDomItem) {
    carouselDomItem.style.display = 'none';
    carouselDomItem.classList.remove('active');
}


/**
 * Affiche l'élément précédent du carousel cible selon l'état du DOM.
 * 
 * @param { Object } carouselDomItems
 */
function previousMovie (carouselDomItems) {
    let classNameItem7 = carouselDomItems[6].classList.value;
    let classNameItem6 = carouselDomItems[5].classList.value;
    let classNameItem5 = carouselDomItems[4].classList.value;

    // Si 7 est visible : désactive l'item 7 et active l'item 3.
    if (classNameItem7 === 'carousel-item active') {
        disableCarouselItem(carouselDomItems[6]);
        activateCarouselItem(carouselDomItems[2]);
    }
    // Si 7 est invisible et 6 est visible : désactive l'item 6 et active l'item 2.
    else if ((classNameItem7 != 'carousel-item active') && (classNameItem6 === 'carousel-item active')) {
        disableCarouselItem(carouselDomItems[5]);
        activateCarouselItem(carouselDomItems[1]);
    }
    // Si 6 est invisible et 5 est visible : désactive l'item 5 et active l'item 1.
    else if ((classNameItem6 != 'carousel-item active') && (classNameItem5 === 'carousel-item active')) {
        disableCarouselItem(carouselDomItems[4]);
        activateCarouselItem(carouselDomItems[0]);
    }
}

/**
 * Affiche l'élément suivant du carousel cible selon l'état du DOM et la base de 3 mouvements possibles (5 éléments min/7 max dont les 4 premiers visibles).
 * @param { Object } carouselDomItems
 */
function nextMovie (carouselDomItems) {
    let classNameItem1 = carouselDomItems[0].classList.value;
    let classNameItem2 = carouselDomItems[1].classList.value;
    let classNameItem3 = carouselDomItems[2].classList.value;

    // Si 1 est visible : désactive l'item 1 et active l'item 5.
    if (classNameItem1 === 'carousel-item active') {
        disableCarouselItem(carouselDomItems[0]);
        activateCarouselItem(carouselDomItems[4]);
    }
    // Si 1 est invisible et 2 est visible : désactive l'item 2 et active l'item 6.
    else if ((classNameItem1 != 'carousel-item active') && (classNameItem2 === 'carousel-item active')) {
        disableCarouselItem(carouselDomItems[1]);
        activateCarouselItem(carouselDomItems[5]);
    }
    // Si 2 est invisible et 3 est visible : désactive l'item 3 et active l'item 7.
    else if ((classNameItem2 != 'carousel-item active') && (classNameItem3 === 'carousel-item active')) {
        disableCarouselItem(carouselDomItems[2]);
        activateCarouselItem(carouselDomItems[6]);
    }
}


/**
 * Initialise le carousel cible.
 * Sélectionne les éléments du DOM correspondant à la cible.
 * Appelle la fonction previousMovie ou nextMovie sur le carousel cible selon la valeur de la classe (left/right) de la flèche cliquée.
 * @param { Object } carouselArrow
 * @param { Object } carouselDomState
 */
export function moveCarousel (carouselArrow, carouselDomState) {
    let carouselId = carouselArrow.parentNode.parentNode.id;
    let carouselDomItems = [];
    let carouselArrowValue = carouselArrow.classList.value;

    for (let carouselDomItem of carouselDomState) {
        let carouselDomItemName = carouselDomItem.id;
      
        if (carouselDomItemName.includes(carouselId)) {
            carouselDomItems.push(carouselDomItem);
        }
    }
    if (carouselArrowValue.includes('left')) {
        previousMovie (carouselDomItems);
    }
    else if (carouselArrowValue.includes('right')) {
        nextMovie (carouselDomItems);
    }
}


/**
 * Crée le carousel (DOM) lié à la catégorie donnée en paramètre si le nombre d'éléments de la catégorie est supérieur à 4.
 * Lie les flèches de navigation de la catégorie au carousel.
 * Initialise l'état de départ de chaque item du carousel : ajout des attributs (visible : classe "active", ou caché : display = "none") à ses éléments "li".
 * Crée et retourne l'objet carousel (carouselDomElement et flèches de navigation) ou le booléen false.
 * @param { Object } category
 * @return { Object } carousel
 * @return { Boolean } false
 */
function createCarousel(category) {

    const carouselMoviesNumber = category.movieDomIds.length;

    try {
        if (carouselMoviesNumber > 4) {
            const carouselDomElement = category.domElement;
            const categoryItemsIds = category.movieDomIds;
            const arrowNavLeft = document.querySelector(carouselDomElement + '.carousel__wrapper__arrow_nav_left');
            const arrowNavRight = document.querySelector(carouselDomElement + '.carousel__wrapper__arrow_nav_right');
            let count = 0;
            
            for (const categoryItemId of categoryItemsIds) {

                // Rattache l'élément de catégorie à l'élément "li" du carousel (DOM)
                const carouselItemDomElement = document.getElementById(categoryItemId);

                count += 1;
                // Ajout de la classe "active" aux 4 éléments visibles du carousel.
                // Ajout du display = "none" aux derniers éléments (invisibles) du carousel.
                if (count < 5) {
                    carouselItemDomElement.classList.add('active');
                } else {
                    carouselItemDomElement.style.display = "none";
                }
            }
            
            const carousel = {
                carouselDomElement: carouselDomElement,
                arrowsNav: [arrowNavLeft, arrowNavRight]
            };
            return carousel;
        } else {
            return false
        }

    } catch (error) {
        alert("Erreur de création du carousel" + error);
    }
}


// Crée puis exporte les carousels s'ils existent
function createCarousels(categories) {
    const carousels = [];
    for (const category of categories) {
        const carousel = createCarousel(category);
        if (carousel != false) {
            carousels.push(carousel);
        }
    }
    return carousels;
}

export const carousels = createCarousels(categories);