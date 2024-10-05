using Server.Entities;

namespace Server.Repositories
{
    public interface IOrderHistoryByUserRepository
    {
        public OrderHistoryByUser GetOrderHistoryByUserById(int oderhistorybyid);
        public OrderHistoryByUser GetOrderHistoryByUserId(string UserId);
        public List<OrderHistoryByUser> GetOrderHistoryByUser();
        public void CreateOrderHistoryByUser(OrderHistoryByUser model);
        public void UpdateOrderHistoryByUser(OrderHistoryByUser model);
        public void DeleteOrderHistoryByUser(int orderhistorybyid);
    }
}
