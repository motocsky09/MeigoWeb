function filterProducts(category) {
    var products = document.querySelectorAll('.product-item');
    products.forEach(function(product) {
        var productCategory = product.dataset.category;
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
