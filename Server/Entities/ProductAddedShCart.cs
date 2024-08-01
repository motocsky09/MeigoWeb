namespace Server.Entities
{
    public class ProductAddedShCart
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string ShoppingCartId { get; set; }
        public int ProductId { get; set; }
        public int SelectedQuantity { get; set; }
    }
}
