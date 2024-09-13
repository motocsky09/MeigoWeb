using Server.Entities;

namespace Server.Repositories
{
    public interface IProfileRepository
    {
        List<Profile> GetProfiles();
        Profile GetProfileById(int profileId);
        void CreateProfile(Profile model);
        void UpdateProfile(Profile model);
        void DeleteProfile(int profileid);
    }
}