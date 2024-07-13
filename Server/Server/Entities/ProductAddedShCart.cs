namespace Server.Entities
{
    public class ProductAddedShCart
    {
        public int Id { get; set; }
        public int UsertId { get; set; }
        public int ShoppingCartId { get; set; }
        public int ProductId { get; set; }
        public int SelectedQuantity { get; set; }
    }
}
