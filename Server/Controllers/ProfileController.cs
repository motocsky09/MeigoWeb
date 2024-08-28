using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

            

            _logger.LogInformation("Profile successfully retrieved.");
            return Ok(); // Returnează 200 OK cu profilul utilizatorului
        }
    }
}