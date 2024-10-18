using Server.Entities;

namespace Server.Repositories
{
    public interface IProductAddedShCartRepository
    {
        public ProductAddedShCart GetProductAddedShCartById(int productaddedshcartId);
        public List<ProductAddedShCart> GetProductAddedShCart();
        public void CreateProductAddedShCart(ProductAddedShCart model);
        public void UpdateProductAddedShCart(ProductAddedShCart model);
        void DeleteAllProductsFromCart();
    }
}
