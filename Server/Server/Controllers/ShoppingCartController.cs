using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Entities;
using Server.Repositories;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IShoppingCartRepository _shoppingcartRepository;

        public ShoppingCartController(IConfiguration configuration, IShoppingCartRepository shoppingcartRepository)
        {
            _configuration = configuration;
            _shoppingcartRepository = shoppingcartRepository;
        }

        [HttpGet]
        [Route("GetShoppingCartById")]
        public ActionResult GetShoppingCartById(int shoppingcartId)
        {
            var result = _shoppingcartRepository.GetShoppingCartById(shoppingcartId);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetShoppingCarts")]
        public ActionResult GetShoppingCarts()
        {
            var result = _shoppingcartRepository.GetShoppingCarts();
            return Ok(result);
        }

        [HttpPost]
        [Route("CreateShoppingCart")]
        public ActionResult CreateShoppingCart(ShoppingCart shoppingCart)
        {
            _shoppingcartRepository.CreateShoppingCart(shoppingCart);
            return Ok(shoppingCart);
        }

        [HttpPut]
        [Route("UpdateShoppingCart")]
        public ActionResult UpdateShoppingCart(ShoppingCart shoppingCart)
        {
            _shoppingcartRepository.UpdateShoppingCart(shoppingCart);
            return Ok(shoppingCart);
        }

        [HttpDelete]
        [Route("DeleteShoppingCart")]
        public ActionResult DeleteShoppingCart(int shoppingcartId)
        {
            _shoppingcartRepository.DeleteShoppingCart(shoppingcartId);
            return Ok();
        }
    }
}
