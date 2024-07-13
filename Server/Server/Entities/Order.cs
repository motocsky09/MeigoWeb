namespace Server.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ShoppingCartId { get; set; }
        public DateTime OrderDate { get; set; }
        public int OrderStatus { get; set; }
        public int DeliveryPrice { get; set;}
        public int Totalamount { get; set; }
    }
}
