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

        [HttpGet]
        [Route("GetProfileByUserName")]
        public ActionResult GetProfileByUserName([FromQuery] string userName)
        {
            var result = _profileRepository.GetProfileByUserName(userName);
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
        public ActionResult DeleteProfile(int profileId)
        {
            _profileRepository.DeleteProfile(profileId);
            return Ok();
        }

        [HttpPost]
        [Route("CreateDefaultProfile")]
        public ActionResult CreateDefaultProfile([FromBody] Profile model)
        {
            var result = _profileRepository.CreateDefaultProfile(model);
            return Ok(result);
        }
    }
}