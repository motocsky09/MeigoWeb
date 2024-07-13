using Server.Entities;

namespace Server.Repositories
{
    public interface IUserRepository
    {
        public User GetUserById(int userId);
    }
}
