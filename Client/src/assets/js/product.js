document.addEventListener("DOMContentLoaded", function() {
    var cartButton = document.getElementById("cartButton");
    var cartItemCount = 0;

    // Adăugăm un event listener pentru fiecare buton de adăugare în coș
    var addToCartButtons = document.querySelectorAll(".button_product");
    addToCartButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var quantityInput = button.parentElement.querySelector(".quantity-input");
            var quantity = parseInt(quantityInput.value); // Obținem cantitatea selectată

            cartItemCount += quantity; // Adăugăm cantitatea la numărul total din coș
            updateCartButtonText(); // Actualizăm textul butonului coșului
        });
    });

    // Funcție pentru actualizarea textului butonului coșului
    function updateCartButtonText() {
        cartButton.innerHTML = '<a href="cos_de_cumparaturi.html"><i class="fas fa-shopping-cart"></i>Coș</a><span id="cartItemCount">' + cartItemCount + '</span>'; // Actualizăm conținutul butonului coșului
    }
});
