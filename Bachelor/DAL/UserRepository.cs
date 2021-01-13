using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bachelor.Models;

namespace Bachelor.DAL
{
    public class UserRepository : IUserRepository
    {

        private readonly UserDBContext _db;
        private List<User> allUsers;


        public UserRepository(UserDBContext db)
        {
            _db = db;
        }

        public async Task<List<User>> GetAllUsers()
        {
            try
            {
                allUsers = await _db.Users.ToListAsync();
                return allUsers;
            }
            catch
            {
                return null;
            }
        }
    }
}
