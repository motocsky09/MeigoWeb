using Server.Entities;

namespace Server.Repositories
{
    public class ProductAddedShCartRepository : IProductAddedShCartRepository
    {
        private readonly ServerDbContext _serverDbContext;
        public ProductAddedShCartRepository(ServerDbContext serverDbContext)
        {
            _serverDbContext = serverDbContext;
        }
        public ProductAddedShCart GetProductAddedShCartById(int productaddedshcartid) 
        {
            return _serverDbContext.ProductAddedShCart.FirstOrDefault(x => x.Id == productaddedshcartid);
        }
        public List<ProductAddedShCart> GetProductAddedShCart()
        {
            return _serverDbContext.ProductAddedShCart.ToList();
        }
        public void CreateProductAddedShCart(ProductAddedShCart model)
        {
            var productaddedshcartid = new ProductAddedShCart
            {
                Id = model.Id,
                UserId = model.UserId,
                ShoppingCartId = model.ShoppingCartId,
                ProductId = model.ProductId,
                SelectedQuantity = model.SelectedQuantity
            };
            _serverDbContext.ProductAddedShCart.Add(productaddedshcartid);
            _serverDbContext.SaveChanges();
        }
        public void UpdateProductAddedShCart (ProductAddedShCart model)
        {
            var existingProductAdded = _serverDbContext.ProductAddedShCart.FirstOrDefault(p => p.Id == model.Id);
            if (existingProductAdded != null)
            {
                existingProductAdded.Id = model.Id;
                existingProductAdded.UserId = model.UserId;
                existingProductAdded.ShoppingCartId = model.ShoppingCartId;
                existingProductAdded.ProductId = model.ProductId;
                existingProductAdded.SelectedQuantity = model.SelectedQuantity;  

                _serverDbContext.SaveChanges();
            }
        }

        
        public void DeleteAllProductsFromCart()
        {
            var products = _serverDbContext.ProductAddedShCart.ToList();
            if (products != null && products.Count > 0)
            {
                _serverDbContext.ProductAddedShCart.RemoveRange(products);
                _serverDbContext.SaveChanges();
            }
        }

    }
}
