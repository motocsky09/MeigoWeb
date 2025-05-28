using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Server.Models;
using System;
using System.IO;
using System.Linq;
using Server.Entities;

namespace Server.Repositories
{
    public class ProductUploadDtoRepository : IProductUploadDtoRepository
    {
        private readonly ServerDbContext _serverDbContext;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductUploadDtoRepository(ServerDbContext serverDbContext, IWebHostEnvironment webHostEnvironment)
        {
            _serverDbContext = serverDbContext;
            _webHostEnvironment = webHostEnvironment;
        }

        public void CreateProduct(ProductUploadDto model)
{
    var product = new Product
    {
        Name = model.Name,
        Price = model.Price,
        ShortDescription = model.ShortDescription,  // corect din DTO
        TotalQuantity = model.TotalQuantity,
        CategoryId = model.CategoryId,
        ImagePath1 = model.ImagePath1 != null ? SaveImage(model.ImagePath1) : null,
        ImagePath2 = model.ImagePath2 != null ? SaveImage(model.ImagePath2) : null,
        ImagePath3 = model.ImagePath3 != null ? SaveImage(model.ImagePath3) : null
    };

    _serverDbContext.Product.Add(product);
    _serverDbContext.SaveChanges();
}

        public void UpdateProduct(ProductUploadDto model)
{
    var existingProduct = _serverDbContext.Product.AsQueryable().FirstOrDefault(p => p.Id == model.Id);

    if (existingProduct != null)
    {
        existingProduct.Name = model.Name;
        existingProduct.CategoryId = model.CategoryId;
        existingProduct.Price = model.Price;
        existingProduct.TotalQuantity = model.TotalQuantity;
        existingProduct.ShortDescription = model.ShortDescription;

        if (model.ImagePath1 != null)
            existingProduct.ImagePath1 = SaveImage(model.ImagePath1);
        if (model.ImagePath2 != null)
            existingProduct.ImagePath2 = SaveImage(model.ImagePath2);
        if (model.ImagePath3 != null)
            existingProduct.ImagePath3 = SaveImage(model.ImagePath3);

        _serverDbContext.SaveChanges();
    }
}

        private string? SaveImage(IFormFile? imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
                return null;

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "images");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                imageFile.CopyTo(fileStream);
            }

            // Returnează calea relativă spre imagine, pe care o poți salva în baza de date
            return "/images/" + uniqueFileName;
        }
    }
}