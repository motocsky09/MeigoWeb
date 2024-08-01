using Server.Entities;

namespace Server.Repositories
{
    public interface IProfileRepository
    {
        public Profile GetProfileById (int profileid);
        public List<Profile> GetProfiles();
        
        public void CreateProfile(Profile model);

        public void UpdateProfile(Profile model);

        public void DeleteProfile(int profileid);
    }
}