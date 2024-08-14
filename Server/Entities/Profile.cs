using Microsoft.AspNetCore.Identity;

namespace Server.Entities
{
    public class Profile
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        
        // Proprietatea UserId trebuie să fie de tip nullable
        public string? UserId { get; set; }  // Adaugă semnul ? pentru a permite valori NULL
    }
}