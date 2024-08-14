using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.Entities;
using Server.Repositories;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IProfileRepository _profileRepository;
        private readonly ILogger<ProfileController> _logger;

        public ProfileController(IConfiguration configuration, IProfileRepository profileRepository, ILogger<ProfileController> logger)
        {
            _configuration = configuration;
            _profileRepository = profileRepository;
            _logger = logger;
        }

        [HttpGet]
        [Route("GetProfiles")]
        public ActionResult GetProfiles()
        {
            var result = _profileRepository.GetProfiles();
            return Ok(result);
        }

        [HttpPost("CreateProfile")]
        [Authorize]
        public IActionResult CreateProfile([FromBody] Profile profile)
        {
            if (profile == null)
            {
                return BadRequest("Profile data is null.");
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized(); // Dacă utilizatorul nu este autentificat
            }

             //Verifică dacă profilul există deja
            var existingProfile = _profileRepository.GetUserProfileAsync(userId).Result;
            if (existingProfile != null)
            {
                return BadRequest("Un profil deja există pentru acest utilizator.");
            }

            // Creează un profil nou
             profile.UserId = userId;
            _profileRepository.CreateProfile(profile);

            return Ok(profile);
        }


        [HttpPut]
        [Authorize]
        [Route("UpdateProfile")]
        public ActionResult UpdateProfile(Profile profile)
        {
            _profileRepository.UpdateProfile(profile);
            return Ok(profile);
        }

        [HttpDelete]
        [Authorize]
        [Route("DeleteProfile")]
        public ActionResult DeleteProfile(int profileid)
        {
            _profileRepository.DeleteProfile(profileid);
            return Ok();
        }

         [HttpGet("GetUserProfile")]
        public async Task<IActionResult> GetUserProfile()
        {
            _logger.LogInformation("GetUserProfile method called.");
            _logger.LogInformation("Claims in token:");
            foreach (var claim in User.Claims)
            {
                _logger.LogInformation($"{claim.Type}: {claim.Value}");
            }


            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                _logger.LogWarning("User ID not found in token.");
                return Unauthorized(); // Returnează 401 Unauthorized dacă ID-ul utilizatorului nu este găsit
            }

            var profile = await _profileRepository.GetUserProfileAsync(userId);
            if (profile == null)
            {
               _logger.LogWarning($"Profile not found for user ID {userId}.");
              return NotFound("Profilul nu a fost găsit."); // Returnează 404 Not Found dacă profilul nu este găsit
            }

            _logger.LogInformation("Profile successfully retrieved.");
            return Ok(profile); // Returnează 200 OK cu profilul utilizatorului
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
