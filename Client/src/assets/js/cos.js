function addToCart(event) {
    
    var numeProdus = event.target.parentNode.querySelector('.details h3').innerText;
    var pretProdus = event.target.parentNode.querySelector('.details .pret_produs').innerText;
    var cantitateProdus = event.target.parentNode.querySelector('.details .quantity-input').value;

    
    var produs = {
        nume: numeProdus,
        pret: pretProdus,
        cantitate: cantitateProdus
    };

    
    localStorage.setItem('produs', JSON.stringify(produs));
}
