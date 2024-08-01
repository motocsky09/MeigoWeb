using Microsoft.AspNetCore.Mvc;
using Server.Entities;
using Server.Models;

namespace Server.Repositories
{
    public class ShoppingCartRepository : IShoppingCartRepository
    {
        private readonly ServerDbContext _serverDbContext;
        private readonly IdentityContext _identityContext;
        public ShoppingCartRepository(ServerDbContext serverDbContext, IdentityContext identityContext)
        {
            _serverDbContext = serverDbContext;
            _identityContext = identityContext;
        }
        public ShoppingCart GetShoppingCartById(string shoppingCartId)
        {
            return _serverDbContext.ShoppingCart.FirstOrDefault(x => x.Id == shoppingCartId);
        }
        public List<ShoppingCart> GetShoppingCarts()
        {
            return _serverDbContext.ShoppingCart.ToList();
        }
        public void CreateShoppingCart(ShoppingCart model)
        {
            var shoppingcart = new ShoppingCart
            {
                Id = model.Id,
                UserId = model.UserId,
                ProductAddedShCartId = model.ProductAddedShCartId,
                TotalAmount = model.TotalAmount
            };
            _serverDbContext.ShoppingCart.Add(shoppingcart);
            _serverDbContext.SaveChanges();
        }
        public void UpdateShoppingCart (ShoppingCart model)
        {
            var existingShoppingCart = _serverDbContext.ShoppingCart.FirstOrDefault(p => p.Id == model.Id);
            if (existingShoppingCart != null)
            {
                existingShoppingCart.Id = model.Id;
                existingShoppingCart.UserId = model.UserId;
                existingShoppingCart.ProductAddedShCartId = model.ProductAddedShCartId;
                existingShoppingCart.TotalAmount = model.TotalAmount;

                _serverDbContext.SaveChanges();
            }
        }
        public void DeleteShoppingCart (string shoppingCartId)
        {
            var shoppingcartToDelete = _serverDbContext.ShoppingCart.FirstOrDefault(p => p.Id == shoppingCartId);
            if (shoppingcartToDelete != null)
            {
                _serverDbContext.ShoppingCart.Remove(shoppingcartToDelete);
                _serverDbContext.SaveChanges();
            }
        }
        public ShoppingCart CreateFirstShoppingCartByUsername(string userName)
        {
            string userId = null;
            string shoppingcart = null;

            if (!string.IsNullOrEmpty(userName))
            {
                var user = _identityContext.Users.FirstOrDefault(x => x.UserName == userName);
                if (user != null)
                {
                    userId = user.Id;
                }
            }

            if (!string.IsNullOrEmpty(userId))
            {
                var cart = _serverDbContext.ShoppingCart.FirstOrDefault(p => p.UserId == userId);
                if (cart != null)
                {
                    shoppingcart = cart.Id;
                }
            }

            if (string.IsNullOrEmpty(shoppingcart))
            {
                var shoppingCartId = Guid.NewGuid().ToString();

                var result = new ShoppingCart
                {
                    Id = shoppingCartId,
                    UserId = userId,
                    ProductAddedShCartId = 0,
                    TotalAmount = 0
                };

                _serverDbContext.ShoppingCart.Add(result);
                _serverDbContext.SaveChanges();
                return result;
            }
            return null;
        }

         public ProductAddedShCart AddProductInShoppingCart([FromQuery]string shoppingCartId, [FromQuery] int productId, [FromQuery] int selectedQuantity)
         {
             string userId = "";

             if (shoppingCartId != null)
             {
                 var cart = _serverDbContext.ShoppingCart.FirstOrDefault(p => p.Id == shoppingCartId);
                 if (cart != null)
                 {
                     userId = cart.UserId;
                 }
             }

            var productShoppingCart = new ProductAddedShCart
            {
                //Id = model.Id,
                UserId = userId,
                ShoppingCartId = shoppingCartId,
                ProductId = productId,
                SelectedQuantity = selectedQuantity
            };

            _serverDbContext.ProductAddedShCart.Add(productShoppingCart);
             _serverDbContext.SaveChanges();

            return productShoppingCart;
         }

        public string GetShoppingCartIdByUserName (string userName)
        {
            string shoppingCartId = "";
            string userId = "";

            if (!string.IsNullOrEmpty(userName))
            {
                var user = _identityContext.Users.FirstOrDefault(x => x.UserName == userName);
                if (user != null)
                {
                    userId = user.Id;
                }
            }

            if (userId != null)
            {
                shoppingCartId = _serverDbContext.ShoppingCart.FirstOrDefault(x => x.UserId == userId).Id;
            }
            return shoppingCartId;
        }

        public List<ProductAddedShCart> GetShoppingCartListById(string shoppingCartId)
        {
            if (!string.IsNullOrEmpty(shoppingCartId))
            {
                var list = _serverDbContext.ProductAddedShCart.Where(x => x.ShoppingCartId == shoppingCartId).ToList();
                return list;
            }

            return null;
        }


        public List<ProductResponse> GetProdutsFromShoppingById(string shoppingCartId)
        {
            var prodAddedShCart = new List<ProductAddedShCart>();
            var productsList = new List<ProductResponse>();

            if (!string.IsNullOrEmpty(shoppingCartId))
            {
                prodAddedShCart = _serverDbContext.ProductAddedShCart.Where(x => x.ShoppingCartId == shoppingCartId).OrderBy(x => x.ProductId).ToList();

                if(prodAddedShCart.Count > 0)
                {
                    foreach (var product in prodAddedShCart) {
                        var res = _serverDbContext.ProductAddedShCart.Where(x => x.ShoppingCartId == shoppingCartId && x.ProductId == product.ProductId).ToList();
                        
                        var productTmp = _serverDbContext.Product.FirstOrDefault(x => x.Id == product.ProductId);
                        var productResponseTmp = new ProductResponse
                        {
                            Id = productTmp.Id,
                            Name = productTmp.Name,
                            Price = productTmp.Price,
                            ShortDescription = productTmp.ShortDescription,
                            TotalQuantity = productTmp.TotalQuantity,
                            CategoryId = productTmp.CategoryId,
                            ImagePath = productTmp.ImagePath
                        };
                        var selectedQuantityTmp = 0;
                        var sumSelectedQuantityTmp = 0;
                        foreach (var item in res) {
                            selectedQuantityTmp += item.SelectedQuantity;
                            sumSelectedQuantityTmp += (item.SelectedQuantity * productResponseTmp.Price); 
                        }
                        productResponseTmp.SelectedQuantity = selectedQuantityTmp;
                        productResponseTmp.SumSelectedQuantity = sumSelectedQuantityTmp;

                        bool existProduct = false;
                        foreach (var itemExist in productsList) { 
                            if(itemExist.Id == productResponseTmp.Id)
                            {
                                existProduct = true;
                            }
                        }

                        if (!existProduct)
                        {
                            productsList.Add(productResponseTmp);
                        }
                    }
                    return productsList;
                }
            }

            return null;
        }

        public int GetCountProductsFromCartShopping(string shoppingCartId)
        {
            if (!string.IsNullOrEmpty(shoppingCartId))
            {
                var list = _serverDbContext.ProductAddedShCart.Where(x => x.ShoppingCartId == shoppingCartId).GroupBy(x => x.ProductId).ToList();
                
                return list.Count;
            }

            return 0;
        }
    }
}
