namespace Server.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string ShortDescription { get; set; }
        public int TotalQuantity { get; set; }
        public int CategoryId { get; set; }
        public string ImagePath { get; set; }
    }
}
