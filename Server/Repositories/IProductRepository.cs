using Server.Entities;

namespace Server.Repositories
{
    public interface IProductRepository
    {
        public Product GetProductById (int productid);
        public List<Product> GetProducts();

        public List<Product> GetProductsByCategoryId(int categoryId);
        public List<Product> GetProductBySize(string size);
        public List<Product> GetProductByColor(string color);
        public List<Product> GetProductBySeason(string season);
        public List<Product> GetProductByGender(string gender);
        public List<Product> GetProductByMaterial(string material);
        public void CreateProduct(Product model);

        public void UpdateProduct(Product model);

        public void DeleteProduct(int productid);
    }
}
