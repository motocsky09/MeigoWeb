public class ProductUploadDto
{   
    public int Id { get; set; }
    public string Name { get; set; }
    public int Price { get; set; }
    public string ShortDescription { get; set; }
    public int TotalQuantity { get; set; }
    public int CategoryId { get; set; }

    public IFormFile? ImagePath1 { get; set; }
    public IFormFile? ImagePath2 { get; set; }
    public IFormFile? ImagePath3 { get; set; }
}