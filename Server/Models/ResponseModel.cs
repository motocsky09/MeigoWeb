using Server.Entities;

namespace Server.Models
{
	public class ResponseModel
	{
		public string? Status { get; set; }
		public string? Message { get; set;}
		public Profile Profile { get; set; }
	}
}