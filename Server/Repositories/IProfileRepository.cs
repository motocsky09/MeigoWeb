using Server.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Server.Repositories
{
    public interface IProfileRepository
    {
        Profile GetProfileById(int profileid);
        List<Profile> GetProfiles();
        void CreateProfile(Profile model);
        void UpdateProfile(Profile model);
        void DeleteProfile(int profileid);
        Task<Profile> GetUserProfileAsync(string userId);
    }
}