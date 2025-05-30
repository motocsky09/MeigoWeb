using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Models;
using Server.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IShoppingCartRepository _shoppingcartRepository;

        public AuthenticateController(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IHttpContextAccessor httpContextAccessor, IShoppingCartRepository shoppingCartRepository)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            _shoppingcartRepository = shoppingCartRepository;

        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var token = GetToken(authClaims);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseModel { Status = "Error", Message = "Utilizator deja existent!", Profile = new Entities.Profile() });

            IdentityUser user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new ResponseModel { Status = "Error", Message = "Parola nu îndeplinește condițiile.", Profile = new Entities.Profile() });

            // Verificare dacă username-ul se termină cu ".admin"
            if (model.Username.EndsWith(".admin"))
            {
                // Asigură-te că rolul "Admin" există
                if (!await _roleManager.RoleExistsAsync("Admin"))
                {
                    await _roleManager.CreateAsync(new IdentityRole("Admin"));
                }

                await _userManager.AddToRoleAsync(user, "Admin");
            }
            else
            {
                if (!await _roleManager.RoleExistsAsync("User"))
                {
                    await _roleManager.CreateAsync(new IdentityRole("User"));
                }

                await _userManager.AddToRoleAsync(user, "User");
            }

            return Ok(new ResponseModel
            {
                Status = "Success",
                Message = "User created successfully!",
                Profile = new Entities.Profile
                {
                    UserName = model.Username,
                    FirstName = "",
                    LastName = "",
                    Address = "",
                    Email = model.Email,
                    PhoneNumber = "",
                    City = "",
                    Postal = ""
                }
            });
        }

        [HttpGet]
        [Authorize]
        [Route("GetUserName")]
        public async Task<IActionResult> GetUserName()
        {
            var userName = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Name).ToString();

            return Ok(userName);
        }

        [HttpGet]
        [Route("GetShoppingCartIdByUserName")]
        public async Task<IActionResult> GetShoppingCartIdByUserName([FromQuery] string userName)
        {
            string shoppingCartId = "";
            /*var userName = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Name).ToString();*/

            if (userName != null)
            {
                shoppingCartId = _shoppingcartRepository.GetShoppingCartIdByUserName(userName);
            }

            return Ok(shoppingCartId);
        }
        [HttpGet]
        [Route("GetUserIdByUserName")]
        public IActionResult GetUserIdByUserName([FromQuery] string userName)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.UserName == userName);
            if (user == null) return NotFound("User not found");
            return Ok(user.Id);
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(30),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}