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

        public ProfileController(IConfiguration configuration, IProfileRepository profileRepository)
        {
            _configuration = configuration;
            _profileRepository = profileRepository;
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
    }
}
