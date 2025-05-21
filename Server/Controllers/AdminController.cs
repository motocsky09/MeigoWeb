using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Authorize(Roles = "Admin")] // 🔒 Acces permis doar adminilor
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpGet("dashboard")]
        public IActionResult GetDashboard()
        {
            return Ok("✅ Acces permis: Ești administrator!");
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("✅ Doar Adminii pot vedea acest mesaj.");
        }
    }
}