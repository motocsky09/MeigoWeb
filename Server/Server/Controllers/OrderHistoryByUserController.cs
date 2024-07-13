using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Entities;
using Server.Repositories;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderHistoryByUserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IOrderHistoryByUserRepository _orderhistorybyuserRepository;

        public OrderHistoryByUserController(IConfiguration configuration, IOrderHistoryByUserRepository orderhistorybyuserRepository)
        {
            _configuration = configuration;
            _orderhistorybyuserRepository = orderhistorybyuserRepository;
        }

        [HttpGet]
        [Route("GetOrderHistoryById")]
        public ActionResult GetOrderHistoryById(int orderhistorybyid)
        {
            var result = _orderhistorybyuserRepository.GetOrderHistoryByUserById(orderhistorybyid);
            return Ok(result);
        }

        [HttpGet]
        [Route("GetOrderHistorys")]
        public ActionResult GetOrderHistorys()
        {
            var result = _orderhistorybyuserRepository.GetOrderHistoryByUser();
            return Ok(result);
        }

        [HttpPost]
        [Route("CreateOrderHistory")]
        public ActionResult CreateOrderHistory(OrderHistoryByUser orderHistory)
        {
            _orderhistorybyuserRepository.CreateOrderHistoryByUser(orderHistory);
            return Ok(orderHistory);
        }

        [HttpPut]
        [Route("UpdateOrderHistory")]
        public ActionResult UpdateOrderHistory(OrderHistoryByUser orderHistory)
        {
            _orderhistorybyuserRepository.UpdateOrderHistoryByUser(orderHistory);
            return Ok(orderHistory);
        }

        [HttpDelete]
        [Route("DeleteOrderHistory")]
        public ActionResult DeleteOrderHistory(int orderhistoryid)
        {
            _orderhistorybyuserRepository.DeleteOrderHistoryByUser(orderhistoryid);
            return Ok();
        }
    }
}
