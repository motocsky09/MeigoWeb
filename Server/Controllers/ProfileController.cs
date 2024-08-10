using System.Security.Claims;
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

        [HttpPost]
        [Route("CreateProfile")]
        public ActionResult CreateProfile(Profile profile)
        {
            _profileRepository.CreateProfile(profile);
            return Ok(profile);
        }

        [HttpPut]
        [Route("UpdateProfile")]
        public ActionResult UpdateProfile(Profile profile)
        {
            _profileRepository.UpdateProfile(profile);
            return Ok(profile);
        }

        [HttpDelete]
        [Route("DeleteProfile")]
        public ActionResult DeleteProfile(int profileid)
        {
            _profileRepository.DeleteProfile(profileid);
            return Ok();
        }

        [HttpGet]
        [Route("GetUserProfile")]
        public async Task<IActionResult> GetUserProfile()
        {
            // Logare pentru depanare
            _logger.LogInformation("GetUserProfile method called.");

            // Obține ID-ul utilizatorului din token-ul JWT
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                _logger.LogWarning("User ID not found in token.");
                return Unauthorized(); // Returnează 401 Unauthorized dacă ID-ul utilizatorului nu este găsit
            }

            // Obține profilul utilizatorului folosind ID-ul
            var profile = await _profileRepository.GetUserProfileAsync(userId);
            if (profile == null)
            {
                _logger.LogWarning($"Profile not found for user ID {userId}.");
                return NotFound(); // Returnează 404 Not Found dacă profilul nu este găsit
            }

            // Returnează profilul utilizatorului
            _logger.LogInformation("Profile successfully retrieved.");
            return Ok(profile); // Returnează 200 OK cu profilul utilizatorului
        }
    }
}
