using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bachelor.Models;
using System;
using System.Security.Cryptography;
using System.Text;

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

        public async Task<bool> addUser(User user)
        {
            try
            {
                var NewUser = new User();
                NewUser.firstname = user.firstname;
                NewUser.lastname = user.lastname;
                NewUser.age = user.age;
                NewUser.email = user.email;
                NewUser.password = makeHash(user.password);
                _db.Users.Add(NewUser);
                await _db.SaveChangesAsync();
                return true;
            } catch
            {
                return false;
            }
        }

        static string makeHash(string p)
        {
            var salt = Guid.NewGuid().ToString();
            using(SHA256 sha256Hash = SHA256.Create())
            {
                //ComputeHash returns a byte array
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(p));

                //Convert the byte array to a string
                StringBuilder builder = new StringBuilder();
                for(int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
