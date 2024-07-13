using Server.Entities;

namespace Server.Repositories
{
    public class ShoppingCartRepository : IShoppingCartRepository
    {
        private readonly ServerDbContext _serverDbContext;
        public ShoppingCartRepository(ServerDbContext serverDbContext)
        {
            _serverDbContext = serverDbContext;
        }
        public ShoppingCart GetShoppingCartById(int shoppingCartId)
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
        public void DeleteShoppingCart (int shoppingCartId)
        {
            var shoppingcartToDelete = _serverDbContext.ShoppingCart.FirstOrDefault(p => p.Id == shoppingCartId);
            if (shoppingcartToDelete != null)
            {
                _serverDbContext.ShoppingCart.Remove(shoppingcartToDelete);
                _serverDbContext.SaveChanges();
            }
        }
    }
}
