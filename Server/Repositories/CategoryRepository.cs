using Server.Entities;
using Microsoft.EntityFrameworkCore;


namespace Server.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ServerDbContext _serverDbContext;
        
        public CategoryRepository(ServerDbContext serverDbContext)
        {
            _serverDbContext = serverDbContext;
        }
        public Category GetCategoryById(int categoryid)
        {
            return _serverDbContext.Category.FirstOrDefault(x => x.Id == categoryid);
        }

            public List<Category> GetCategories() 
        {
            return _serverDbContext.Category.ToList();
        }
        public void CreateCategory(Category model)
        {
            var category = new Category
            {
                Id = model.Id,
                Name = model.Name
            };
            _serverDbContext.Category.Add(category);
            _serverDbContext.SaveChanges();
        }

        public void UpdateCategory(Category model)
        {
            var existingCategory = _serverDbContext.Category.FirstOrDefault(p => p.Id == model.Id);
            if (existingCategory != null)
            {
                existingCategory.Id = model.Id;
                existingCategory.Name = model.Name;

                _serverDbContext.SaveChanges();
            }
        }

        public void DeleteCategory(int categoryid)
        {
            var categoryToDelete = _serverDbContext.Category.FirstOrDefault(p => p.Id == categoryid);
            if (categoryToDelete != null)
            {
                _serverDbContext.Category.Remove(categoryToDelete);
                _serverDbContext.SaveChanges();
            }
        }
    }
}
