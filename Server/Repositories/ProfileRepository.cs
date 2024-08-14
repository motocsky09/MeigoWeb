using Microsoft.EntityFrameworkCore;
using Server.Entities;

namespace Server.Repositories
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly ServerDbContext _serverDbContext;
        public ProfileRepository(ServerDbContext serverDbContext)
        {
            _serverDbContext = serverDbContext;
        }

        public Profile GetProfileById(int profileid)
        {
            return _serverDbContext.Profile.FirstOrDefault(x => x.Id == profileid);
        }

        public List<Profile> GetProfiles() 
        {
            return _serverDbContext.Profile.ToList();
        }

        public void CreateProfile(Profile model)
        {
            var profile = new Profile
            {
                UserName = model.UserName,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Address = model.Address,
                Email = model.Email,
                PhoneNumber = model.PhoneNumber
            };
            _serverDbContext.Profile.Add(profile);
            _serverDbContext.SaveChanges();
        }

        public void UpdateProfile(Profile model)
        {
            var existingProfile = _serverDbContext.Profile.FirstOrDefault(p => p.Id == model.Id);
            if (existingProfile != null)
            {
                existingProfile.UserName = model.UserName;
                existingProfile.FirstName = model.FirstName;
                existingProfile.LastName = model.LastName;
                existingProfile.Address = model.Address;
                existingProfile.Email = model.Email;
                existingProfile.PhoneNumber = model.PhoneNumber;
                

                _serverDbContext.SaveChanges();
            }
        }

        public void DeleteProfile(int profileId)
        {
            var profileToDelete = _serverDbContext.Profile.FirstOrDefault(p => p.Id == profileId);
            if (profileToDelete != null)
            {
                _serverDbContext.Profile.Remove(profileToDelete);
                _serverDbContext.SaveChanges();
            }
        }
        
        //public async Task<Profile> GetUserProfileAsync(string userId)
        //{
         //   return await _serverDbContext.Profile.FirstOrDefaultAsync(p => p.UserId == userId);
        //}
    }
}
