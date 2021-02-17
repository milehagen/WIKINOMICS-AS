using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bachelor.Models;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace Bachelor.DAL
{
    public class UserRepository : IUserRepository
    {

        private readonly UserDBContext _db;


        public UserRepository(UserDBContext db)
        {
            _db = db;
        }

        public async Task<bool> AddUser(User user)
        {
            if(CheckIfRegistered(user))
            {
                return false;
            }
            try
            {
                _db.Users.Add(new User
                {
                    firstname = user.firstname,
                    lastname = user.lastname,
                    age = user.age,
                    email = user.email,
                    password = MakeHash(user.password),
                    role = "user"
                });
                await _db.SaveChangesAsync();
                return true;
            } catch
            {
                return false;
            }
        }


        public async Task<bool> LogIn(User user)
        {
            try
            {
                User userFromDB = await _db.Users.FirstOrDefaultAsync(u => u.email == user.email);
                if (userFromDB == null)
                {
                    Console.WriteLine("Bruker er null");
                }
                user.password = MakeHash(user.password);
                bool comparePasswords = String.Equals(userFromDB.password, user.password, StringComparison.OrdinalIgnoreCase);
                if (comparePasswords)
                {
                    return true;
                }
                return false;
            } 
            catch
            {
                return false;
            }
        }
        

        ///\\\ HELPING METHODS \\\///

        public int FindId(string userEmail)
        {
            User UserFromDB = _db.Users.FirstOrDefault(u => u.email == userEmail);
            return UserFromDB.Id;
        }

        static string MakeHash(string p)
        {
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
        //Returns true if user already is registered
        public bool CheckIfRegistered(User user)
        {
            User UserFromDB = _db.Users.FirstOrDefault(u => u.email == user.email);
            if(UserFromDB == null)
            {
                return false;
            }
            return true;
        }
    } // End of class
}
