using Server.Entities;
using System.Runtime.CompilerServices;

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
        public void CreateOrder(string shoppingCartId, int sumDelivery, int totalSumWithDelivery)
        {
            var order = new Order
            {
                UserId = "",
                ShoppingCartId = "",
                OrderDate = DateTime.UtcNow,
                OrderStatus = 1,
                DeliveryPrice = sumDelivery,
                Totalamount = totalSumWithDelivery,
                Adress = "",
                Street_no = "",
                Zip_code = "",
                Phone_number = "",
                Email = "",
                Comments = "",
                Payment_method = 1
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
                existingOrder.Adress = model.Adress;
                existingOrder.Street_no = model.Street_no;
                existingOrder.Zip_code = model.Zip_code;
                existingOrder.Phone_number = model.Phone_number;
                existingOrder.Email = model.Email;
                existingOrder.Comments = model.Comments;
                existingOrder.Payment_method = model.Payment_method;

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
