using Microsoft.AspNetCore.Http;
using Server.Models;

namespace Server.Repositories
{
    public interface IProductUploadDtoRepository
    {
        void CreateProduct(ProductUploadDto model);
        void UpdateProduct(ProductUploadDto model);
    }
}