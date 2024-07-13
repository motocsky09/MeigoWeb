using Server.Entities;

namespace Server.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ServerDbContext _serverDbContext;
        public OrderRepository(ServerDbContext serverDbContext)
        {
            _serverDbContext = serverDbContext;
        }
        public Order GetOrderById(int orderid)
        {
            return _serverDbContext.Order.FirstOrDefault(x => x.Id == orderid);
        }
        public List<Order> GetOrders() 
        {
            return _serverDbContext.Order.ToList();
        }
        public void CreateOrder(Order model)
        {
            var order = new Order
            {
                Id = model.Id,
                UserId = model.UserId,
                ShoppingCartId = model.ShoppingCartId,
                OrderDate = model.OrderDate,
                OrderStatus = model.OrderStatus,
                DeliveryPrice = model.DeliveryPrice,
                Totalamount = model.Totalamount
            };
            _serverDbContext.Order.Add(order);
            _serverDbContext.SaveChanges();
        }

        public void UpdateOrder(Order model)
        {
            var existingOrder = _serverDbContext.Order.FirstOrDefault(p => p.Id == model.Id);
            if (existingOrder != null)
            {
                existingOrder.Id = model.Id;
                existingOrder.UserId = model.UserId;
                existingOrder.ShoppingCartId = model.ShoppingCartId;
                existingOrder.OrderDate = model.OrderDate;
                existingOrder.OrderStatus = model.OrderStatus;
                existingOrder.DeliveryPrice = model.DeliveryPrice; 
                existingOrder.Totalamount = model.Totalamount;  

                _serverDbContext.SaveChanges();
            }
        }

        public void DeleteOrder(int orderid)
        {
            var orderToDelete = _serverDbContext.Order.FirstOrDefault(p => p.Id == orderid);
            if (orderToDelete != null)
            {
                _serverDbContext.Order.Remove(orderToDelete);
                _serverDbContext.SaveChanges();
            }
        }
    }

}
