using Server.Entities;

namespace Server.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ServerDbContext _serverDbContext;

        public UserRepository(ServerDbContext serverDbContext) 
        {
            _serverDbContext = serverDbContext;
        }
        public User GetUserById(int userid) 
        {
            return _serverDbContext.User.FirstOrDefault(x => x.Id == userid);
        }
    }
}
