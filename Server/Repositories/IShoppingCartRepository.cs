using Server.Entities;
using Server.Models;

namespace Server.Repositories
{
    public interface IShoppingCartRepository
    {
        public ShoppingCart GetShoppingCartById(string shoppingcartId);
        public List<ShoppingCart> GetShoppingCarts();
        public void CreateShoppingCart(ShoppingCart model);
        public void UpdateShoppingCart(ShoppingCart model);
        public void DeleteShoppingCart (string shoppingcartId);

        public ShoppingCart CreateFirstShoppingCartByUsername(string username);

        public ProductAddedShCart AddProductInShoppingCart(string shoppingCartId, int productId, int selectedQuantity);

        public ProductAddedShCart UpdateProductInShoppingCart(string shoppingCartId, int productId, int updatedQuantity);
        public string GetShoppingCartIdByUserName(string userId);

        public List<ProductAddedShCart> GetShoppingCartListById(string shoppingCartId);
        List<ProductResponse> GetProdutsFromShoppingById(string shoppingCartId);
        public int GetCountProductsFromCartShopping(string shoppingCartId);
        public void DeleteProductFromCart(string shoppingCartId, int productId);
    }
}
