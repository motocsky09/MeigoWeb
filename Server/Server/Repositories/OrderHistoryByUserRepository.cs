using Server.Entities;
using System.Linq;

namespace Server.Repositories
{
    public class OrderHistoryByUserRepository : IOrderHistoryByUserRepository
    {
        private readonly ServerDbContext _serverDbContext;

        public OrderHistoryByUserRepository(ServerDbContext serverDbContext)
        {
            _serverDbContext = serverDbContext;
        }
        public OrderHistoryByUser GetOrderHistoryByUserById(int orderhistorybyid)
        {
            return _serverDbContext.OrderHistoryByUser.FirstOrDefault(x => x.Id == orderhistorybyid);
        }

        public List<OrderHistoryByUser> GetOrderHistoryByUser()
        {
            return _serverDbContext.OrderHistoryByUser.ToList();
        }
        public void CreateOrderHistoryByUser (OrderHistoryByUser model)
        {
            var orderhistoryby = new OrderHistoryByUser
            {
                Id = model.Id,
                UserId = model.UserId,
                OrderId = model.OrderId
            };
            _serverDbContext.OrderHistoryByUser.Add(orderhistoryby);
            _serverDbContext.SaveChanges();
        }
        public void UpdateOrderHistoryByUser (OrderHistoryByUser model)
        {
            var existingOrderHistoryByUser = _serverDbContext.OrderHistoryByUser.FirstOrDefault(p => p.Id == model.Id);
            if (existingOrderHistoryByUser != null)
            {
                existingOrderHistoryByUser.Id = model.Id;
                existingOrderHistoryByUser.UserId = model.Id;
                existingOrderHistoryByUser.OrderId = model.OrderId;

                _serverDbContext.SaveChanges();
            }
        }
        public void DeleteOrderHistoryByUser (int orderhistoryid){
            var orderHistoryByUserToDelete = _serverDbContext.OrderHistoryByUser.FirstOrDefault(p => p.Id == orderhistoryid);
            if (orderHistoryByUserToDelete != null)
            {
                _serverDbContext.OrderHistoryByUser.Remove(orderHistoryByUserToDelete);
                _serverDbContext.SaveChanges();
            }
        }
    }
}
