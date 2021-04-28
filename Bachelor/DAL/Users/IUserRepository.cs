using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bachelor.Models;
using Bachelor.Models.Communities;

namespace Bachelor.DAL
{
    public interface IUserRepository
    {

        Task<User> GetUser(int userID);
        Task<bool> AddUser(User user);

        Task<bool> LogIn(User user);
        int FindId(string userEmail);
        Task<List<Industry>> GetAllIndustries();

        Task<List<studentSubject>> GetAllStudentSubjects();

        Task<bool> Subscribe(int userId, Community community);

        Task<bool> Unsubscribe(int userId, Community community);

        Task<bool> PostExpInfo(Experience exp);

        Task<bool> AddExperience(Experience exp, int userId);

        Task<List<Experience>> GetExperiences(User user);

        Task<Experience> GetExperience(int experienceId);
    }
}
