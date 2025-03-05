using Server.Entities;

namespace Server.Repositories
{
    public interface IOrderRepository
    {
        public Order GetOrderById(int orderid);

        public List<Order> GetOrders();
        public void CreateOrder(string userId, string shoppingCartId, int sumDelivery, int totalSumWithDelivery, string Address, string PhoneNumber, string Email, string Postal,string Comments);

        public void UpdateOrder(Order model);

        public void DeleteOrder(int orderid);
        
    }
}
