using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Entities;
using Server.Repositories;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(IConfiguration configuration, ICategoryRepository categoryRepository)
        {
            _configuration = configuration;
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        [Route("GetCategoryById")]
        public ActionResult GetCategoryById(int categoryid)
        {
            var result = _categoryRepository.GetCategoryById(categoryid);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetCategories")]
        public ActionResult GetCategories()
        {
            var result = _categoryRepository.GetCategories();
            return Ok(result);
        }


        [HttpPost]
        [Route("CreateCategory")]
        public ActionResult CreateCategory(Category category)
        {
            _categoryRepository.CreateCategory(category);
            return Ok(category);
        }

        [HttpPut]
        [Route("UpdateCategory")]
        public ActionResult UpdateCategory(Category category)
        {
            _categoryRepository.UpdateCategory(category);
            return Ok(category);
        }

        [HttpDelete]
        [Route("DeleteCategory")]
        public ActionResult DeleteCategory(int categoryid)
        {
            _categoryRepository.DeleteCategory(categoryid);
            return Ok();
        }
    }
}
