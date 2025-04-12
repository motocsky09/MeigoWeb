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
        public List<Product> GetProductBySize(string size)
        {
            return _serverDbContext.Product.Where(x => x.Size == size).ToList();
        }
        public List<Product> GetProductByColor(string color)
        {
            return _serverDbContext.Product.Where(x => x.Color == color).ToList();
        }
        public List<Product> GetProductBySeason(string season)
        {
            return _serverDbContext.Product.Where(x => x.Season == season).ToList();
        }
        public List<Product> GetProductByGender(string gender)
        {
            return _serverDbContext.Product.Where(x => x.Gender == gender).ToList();
        }
        public List<Product> GetProductByMaterial(string material)
        {
            return _serverDbContext.Product.Where(x => x.Material == material).ToList();
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
                ImagePath1 = model.ImagePath1,
                ImagePath2 = model.ImagePath2,
                ImagePath3 = model.ImagePath3,
                Size = model.Size,
                Color = model.Color,
                Season = model.Season,
                Gender = model.Gender,
                Material = model.Material
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
                existingProduct.ImagePath1 = model.ImagePath1;
                existingProduct.ImagePath2 = model.ImagePath2;
                existingProduct.ImagePath3 = model.ImagePath3;
                existingProduct.Size = model.Size;
                existingProduct.Color = model.Color;
                existingProduct.Season = model.Season;
                existingProduct.Gender = model.Gender;
                existingProduct.Material = model.Material;

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
