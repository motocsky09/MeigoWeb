using Server.Entities;

namespace Server.Repositories
{
    public interface IOrderRepository
    {
        public Order GetOrderById(int orderid);

        public List<Order> GetOrders();
        public void CreateOrder(string shoppingCartId, int sumDelivery, int totalSumWithDelivery);

        public void UpdateOrder(Order model);

        public void DeleteOrder(int orderid);
        
    }
}
