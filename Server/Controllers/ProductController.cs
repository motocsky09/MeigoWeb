using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Entities;
using Server.Models;
using Server.Repositories;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IProductRepository _productRepository;
        private readonly IProductUploadDtoRepository _productUploadDtoRepository;

        public ProductController(IConfiguration configuration, IProductRepository productRepository, IProductUploadDtoRepository productUploadDtoRepository)
        {
            _configuration = configuration;
            _productRepository = productRepository;
            _productUploadDtoRepository = productUploadDtoRepository;
        }

        [HttpGet]
        [Route("GetProductById")]
        public ActionResult GetProductById(int productId)
        {
            var result = _productRepository.GetProductById(productId);
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

        [HttpPost]
        [Route("UploadProductWithImages")]
        public async Task<IActionResult> UploadProductWithImages([FromForm] ProductUploadDto dto)
        {
            // Calea absolută către folderul din proiectul Angular
            string SaveImage(IFormFile file)
            {
                if (file == null || file.Length == 0)
                    return null!;

                var uploadsFolder = "/Users/andreimotoc/Documents/MeigoWeb/Client/src/assets/new_products";

                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var fullPath = Path.Combine(uploadsFolder, fileName);

                using var stream = new FileStream(fullPath, FileMode.Create);
                file.CopyTo(stream);

                // Returnăm calea relativă pentru a fi folosită în Angular
                return "assets/images/" + fileName;
            }

            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                ShortDescription = dto.ShortDescription,
                TotalQuantity = dto.TotalQuantity,
                CategoryId = dto.CategoryId,
                ImagePath1 = dto.ImagePath1 != null ? SaveImage(dto.ImagePath1) : null,
                ImagePath2 = dto.ImagePath2 != null ? SaveImage(dto.ImagePath2) : null,
                ImagePath3 = dto.ImagePath3 != null ? SaveImage(dto.ImagePath3) : null
            };

            _productRepository.CreateProduct(product);
            return Ok(product);
        }
    }
}
