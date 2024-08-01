using Server.Entities;

namespace Server.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ServerDbContext _serverDbContext;
        public ProductRepository(ServerDbContext serverDbContext)
        {
            _serverDbContext = serverDbContext;
        }
        public Product GetProductById(int productid)
        {
            return _serverDbContext.Product.FirstOrDefault(x => x.Id == productid);
        }
        public List<Product> GetProducts() 
        {
            return _serverDbContext.Product.ToList();
        }
        public List<Product> GetProductsByCategoryId(int categoryId)
        {
            return _serverDbContext.Product.Where(x => x.CategoryId == categoryId).ToList();
        }
        public void CreateProduct(Product model)
        {
            var product = new Product
            {
                Name = model.Name,
                Price = model.Price,
                ShortDescription = model.ShortDescription,
                TotalQuantity = model.TotalQuantity,
                CategoryId = model.CategoryId,
                ImagePath = model.ImagePath
            };
            _serverDbContext.Product.Add(product);
            _serverDbContext.SaveChanges();
        }

        public void UpdateProduct(Product model)
        {
            var existingProduct = _serverDbContext.Product.FirstOrDefault(p => p.Id == model.Id);
            if (existingProduct != null)
            {
                existingProduct.Name = model.Name;
                existingProduct.Price = model.Price;
                existingProduct.ShortDescription = model.ShortDescription;
                existingProduct.TotalQuantity = model.TotalQuantity;
                existingProduct.CategoryId = model.CategoryId;
                existingProduct.ImagePath = model.ImagePath;

                _serverDbContext.SaveChanges();
            }
        }

        public void DeleteProduct(int productId)
        {
            var productToDelete = _serverDbContext.Product.FirstOrDefault(p => p.Id == productId);
            if (productToDelete != null)
            {
                _serverDbContext.Product.Remove(productToDelete);
                _serverDbContext.SaveChanges();
            }
        }
    }
}
