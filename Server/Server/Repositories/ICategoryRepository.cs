using Server.Entities;

namespace Server.Repositories
{
    public interface ICategoryRepository
    {
        public Category GetCategoryById(int id);
        public List<Category> GetCategory();
        public void CreateCategory(Category model);

        public void UpdateCategory(Category model);

        public void DeleteCategory(int categoryid);
    }
}
