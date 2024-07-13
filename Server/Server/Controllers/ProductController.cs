using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Entities;
using Server.Repositories;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IProductRepository _productRepository;

        public ProductController(IConfiguration configuration, IProductRepository productRepository)
        {
            _configuration = configuration;
            _productRepository = productRepository;
        }

        [HttpGet]
        [Route("GetProductById")]
        public ActionResult GetProductById(int productid)
        {
            var result = _productRepository.GetProductById(productid);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetProducts")]
        public ActionResult GetProducts()
        {
            var result = _productRepository.GetProducts();
            return Ok(result);
        }

        [HttpGet]
        [Route("GetProductsByCategoryId")]
        public ActionResult GetProductsByCategoryId(int categoryId)
        {
            var result = _productRepository.GetProductsByCategoryId(categoryId);
            return Ok(result);
        }

        [HttpPost]
        [Route("CreateProduct")]
        public ActionResult CreateProduct(Product product)
        {
            _productRepository.CreateProduct(product);
            return Ok(product);
        }

        [HttpPut]
        [Route("UpdateProduct")]
        public ActionResult UpdateProduct(Product product)
        {
            _productRepository.UpdateProduct(product);
            return Ok(product);
        }

        [HttpDelete]
        [Route("DeleteProduct")]
        public ActionResult DeleteProduct(int productid)
        {
            _productRepository.DeleteProduct(productid);
            return Ok();
        }
    }
}
