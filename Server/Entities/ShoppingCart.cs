namespace Server.Entities
{
    public class ShoppingCart
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public int ProductAddedShCartId { get; set; }
        public int TotalAmount { get; set; }
    }
}
