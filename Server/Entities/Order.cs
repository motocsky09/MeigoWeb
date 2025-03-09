namespace Server.Entities
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string ShoppingCartId { get; set; }
        public DateTime OrderDate { get; set; }
        public int OrderStatus { get; set; }
        public int DeliveryPrice { get; set;}
        public int Totalamount { get; set; }
        public string Adress {  get; set; }
        public string City { get; set; }
        public string Zip_code { get; set; }
        public string Phone_number { get; set; }
        public string Email { get; set; }
        public string Comments { get; set; }
        public int Payment_method { get; set; }
    }
}
