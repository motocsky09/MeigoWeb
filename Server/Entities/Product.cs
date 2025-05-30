﻿namespace Server.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string ShortDescription { get; set; }
        public int TotalQuantity { get; set; }
        public int CategoryId { get; set; }
        public string ImagePath1 { get; set; }
        public string ImagePath2 { get; set; }
        public string ImagePath3 { get; set; }
        
        public string Size { get; set; }
        public string Color { get; set; }
        public string Season { get; set; }
        public string Gender { get; set; }
        public string Material { get; set; }

    }
}
