using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bachelor.Models;

namespace Bachelor.DAL
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllUsers();
        Task<bool> AddUser(User user);
        Task<bool> LogIn(User user);
        int FindId(string userEmail);
    }
}
