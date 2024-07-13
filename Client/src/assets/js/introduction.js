// src/assets/scripts/introduction.js

// Selecția tuturor elementelor care trebuie afișate pe măsură ce utilizatorul face scroll
var elementsToShow = document.querySelectorAll('.introduction h2, .introduction h3, .buton .buton1');
var index = 0; // Index pentru următorul element de afișat

// Funcția care rulează atunci când utilizatorul face scroll
function handleScroll() {
    // Parcurgem fiecare element din lista de elemente
    if (index < elementsToShow.length) {
        // Verificăm dacă elementul este în zona de vizibilitate
        if (isElementInViewport(elementsToShow[index]) && !elementsToShow[index].classList.contains('show')) {
            // Adăugăm clasa 'show' pentru a afișa elementul
            elementsToShow[index].classList.add('show');
            index++; // Trecem la următorul element
        }
    }
}

// Funcție pentru verificarea dacă un element este în zona de vizibilitate
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Adăugăm un eveniment de ascultare la scroll pentru a apela handleScroll
window.addEventListener('scroll', handleScroll);

// Apelăm handleScroll pentru a afișa elementele care sunt deja în zona de vizibilitate la încărcarea paginii
handleScroll();

// Adăugăm și un eveniment de redimensionare a ferestrei pentru a reevalua pozițiile elementelor
window.addEventListener('resize', handleScroll);

// Exporting the function to make it accessible from Angular
window.initIntroduction = function() {
    handleScroll(); // Initial call to handleScroll
}
