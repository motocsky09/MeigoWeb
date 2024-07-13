using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Entities;
using Server.Repositories;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductAddedShCartController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IProductAddedShCartRepository _productaddedshcartRepository;

        public ProductAddedShCartController(IConfiguration configuration, IProductAddedShCartRepository productaddedshcartRepository)
        {
            _configuration = configuration;
            _productaddedshcartRepository = productaddedshcartRepository;
        }

        [HttpGet]
        [Route("GetProductAddedShCartById")]
        public ActionResult GetProductAddedShCartById(int productaddedshcartId)
        {
            var result = _productaddedshcartRepository.GetProductAddedShCartById(productaddedshcartId);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetProductAddedShCart")]
        public ActionResult GetProductAddeds()
        {
            var result = _productaddedshcartRepository.GetProductAddedShCart();
            return Ok(result);
        }

        [HttpPost]
        [Route("CreateProductAddedShCart")]
        public ActionResult CreateProductAddedShCart(ProductAddedShCart productAddedShCart)
        {
            _productaddedshcartRepository.CreateProductAddedShCart(productAddedShCart);
            return Ok(productAddedShCart);
        }

        [HttpPut]
        [Route("UpdateProductAddedShCart")]
        public ActionResult UpdateProductAddedShCart(ProductAddedShCart productAddedShCart)
        {
            _productaddedshcartRepository.UpdateProductAddedShCart(productAddedShCart);
            return Ok(productAddedShCart);
        }

        [HttpDelete]
        [Route("DeleteProductAddedShCart")]
        public ActionResult DeleteProductAddedShCart(int productAddedShCart)
        {
            _productaddedshcartRepository.DeleteProductAddedShCart(productAddedShCart);
            return Ok();
        }
    }
}
