document.addEventListener("DOMContentLoaded", function() {
    var cartButton = document.getElementById("cartButton");
    var cartItemCount = 0;

    
    var addToCartButtons = document.querySelectorAll(".button_product");
    addToCartButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var quantityInput = button.parentElement.querySelector(".quantity-input");
            var quantity = parseInt(quantityInput.value); 

            cartItemCount += quantity; 
            updateCartButtonText(); 
        });
    });

    
    function updateCartButtonText() {
        cartButton.innerHTML = '<a href="cos_de_cumparaturi.html"><i class="fas fa-shopping-cart"></i>Coș</a><span id="cartItemCount">' + cartItemCount + '</span>'; 
    }
});
