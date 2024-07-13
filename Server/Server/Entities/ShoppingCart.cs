namespace Server.Entities
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductAddedShCartId { get; set; }
        public int TotalAmount { get; set; }
    }
}
