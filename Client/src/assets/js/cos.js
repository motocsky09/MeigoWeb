function addToCart(event) {
    // Obțineți informațiile despre produs din eveniment
    var numeProdus = event.target.parentNode.querySelector('.details h3').innerText;
    var pretProdus = event.target.parentNode.querySelector('.details .pret_produs').innerText;
    var cantitateProdus = event.target.parentNode.querySelector('.details .quantity-input').value;

    // Stocați informațiile despre produs într-un obiect sau array
    var produs = {
        nume: numeProdus,
        pret: pretProdus,
        cantitate: cantitateProdus
    };

    // Salvați informațiile despre produs în stocul local
    localStorage.setItem('produs', JSON.stringify(produs));
}
