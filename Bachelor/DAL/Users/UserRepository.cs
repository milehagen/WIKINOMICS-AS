using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bachelor.Models;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Bachelor.Models.Communities;

namespace Bachelor.DAL.Users
{
    public class UserRepository : IUserRepository
    {

        private readonly UserDBContext _db;


        public UserRepository(UserDBContext db)
        {
            _db = db;
        }

        public async Task<User> GetUser(int userID)
        {
            try
            {
                User foundUser = await _db.Users.FindAsync(userID);
                return foundUser;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> AddUser(User user)
        {
            if (CheckIfRegistered(user))
            {
                Console.WriteLine("Registrert");
                return false;
            }
            try
            {
                var newUser = new User();
                newUser.Firstname = user.Firstname;
                newUser.Lastname = user.Lastname;
                newUser.Email = user.Email;
                newUser.Password = MakeHash(user.Password);
                newUser.Age = user.Age;
                newUser.Gender = user.Gender;
                newUser.Role = "user";


                newUser.Communities = new List<Community>();
                //Since this is the first experience we only need to get the first one
                Experience exp = user.experience.ElementAt(0);
                newUser.experience = new List<Experience>();

                if (exp.startDate == null)
                {
                    exp.startDate = default(DateTime);
                }

                if (exp.endDate == null)
                {
                    exp.endDate = default(DateTime);
                }

                if(!String.IsNullOrEmpty(exp.Industry.Title)) {
                    Console.WriteLine(exp.Industry.Title);
                    Console.WriteLine(exp.Industry.IndustryId);
                    var checkIndustry = await _db.Industries.FirstOrDefaultAsync(i => i.Title.ToLower() == exp.Industry.Title.ToLower());
                    if (checkIndustry != null)
                    {
                        exp.Industry = checkIndustry;
                    }
                }
                

                if(!String.IsNullOrEmpty(exp.StudentSubject.Title)) {
                    var checkSubject = await _db.Subjects.FirstOrDefaultAsync(s => s.Title.ToLower() == exp.StudentSubject.Title.ToLower());
                    if (checkSubject != null)
                    {
                        exp.StudentSubject = checkSubject;
                    }
                }
                
                if(!String.IsNullOrEmpty(exp.Industry.Title)) {
                    var checkCommunityIndustry = await _db.Communities.FirstOrDefaultAsync(c => c.Title.ToLower() == exp.Industry.Title.ToLower());
                    if (checkCommunityIndustry != null)
                    {
                        newUser.Communities.Add(checkCommunityIndustry);
                    }
                }
                
                if(!String.IsNullOrEmpty(exp.StudentSubject.Title)) {
                    var checkCommunitySubject = await _db.Communities.FirstOrDefaultAsync(c => c.Title.ToLower() == exp.StudentSubject.Title.ToLower());
                    if (checkCommunitySubject != null)
                    {
                        newUser.Communities.Add(checkCommunitySubject);
                    }
                }
                

                newUser.experience.Add(exp);

                await _db.Users.AddAsync(newUser);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> AddExperience(Experience exp, int userId)
        {
            try
            {
                var checkUser = await _db.Users.FindAsync(userId);
                if (checkUser != null)
                {
                    Console.WriteLine("Bruker ble funnet");

                    var newExperience = new Experience();
                    newExperience.user = checkUser;
                    newExperience.occupation = exp.occupation;
                    newExperience.startDate = exp.startDate;
                    newExperience.business = exp.business;

                    if (exp.endDate == null)
                    {
                        newExperience.endDate = default(DateTime);
                    }
                    else { newExperience.endDate = exp.endDate; }

                    if (exp.Industry != null)
                    {
                        var checkIndustry = await _db.Industries.FirstOrDefaultAsync(i => i.Title.ToLower() == exp.Industry.Title.ToLower());
                        if (checkIndustry != null)
                        {
                            newExperience.Industry = checkIndustry;

                            //Also adds a community with same name
                            var checkCommunity = await _db.Communities.FirstOrDefaultAsync(c => c.Title.ToLower() == exp.Industry.Title.ToLower());
                            if (checkCommunity != null)
                            {
                                checkUser.Communities.Add(checkCommunity);
                            }
                        }
                    }

                    if (exp.StudentSubject != null)
                    {
                        var checkSubject = await _db.Subjects.FirstOrDefaultAsync(s => s.Title.ToLower() == exp.StudentSubject.Title.ToLower());
                        if (checkSubject != null)
                        {
                            newExperience.StudentSubject = checkSubject;

                            //Also adds a community with same name
                            var checkCommunity = await _db.Communities.FirstOrDefaultAsync(c => c.Title.ToLower() == exp.StudentSubject.Title.ToLower());
                            if (checkCommunity != null)
                            {
                                checkUser.Communities.Add(checkCommunity);
                            }
                        }
                    }

                    checkUser.experience.Add(newExperience);
                    await _db.SaveChangesAsync();
                    return true;
                }
                Console.WriteLine("Bruker er null");
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> LogIn(User user)
        {
            try
            {
                User userFromDB = await _db.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == user.Email.ToLower());
                if (userFromDB == null)
                {
                    Console.WriteLine("Bruker er null");
                }
                user.Password = MakeHash(user.Password);
                bool comparePasswords = String.Equals(userFromDB.Password, user.Password, StringComparison.OrdinalIgnoreCase);
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

        public async Task<List<Industry>> GetAllIndustries()
        {
            try
            {
                List<Industry> industries = await _db.Industries.ToListAsync();
                return industries;
            }
            catch
            {
                return null;
            }

        }

        public async Task<List<studentSubject>> GetAllStudentSubjects()
        {
            try
            {
                List<studentSubject> studentSubjects = await _db.Subjects.ToListAsync();
                return studentSubjects;
            }
            catch
            {
                return null;
            }

        }



        public int FindId(string userEmail)
        {
            User UserFromDB = _db.Users.FirstOrDefault(u => u.Email == userEmail);
            if(UserFromDB == null) {
                Console.WriteLine("null");
            }
            return UserFromDB.Id;
        }

        static string MakeHash(string p)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                //ComputeHash returns a byte array
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(p));

                //Convert the byte array to a string
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
        //Returns true if user already is registered
        public bool CheckIfRegistered(User user)
        {
            User UserFromDB = _db.Users.FirstOrDefault(u => u.Email == user.Email);
            if (UserFromDB == null)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> Subscribe(int userId, Community community)
        {
            try
            {
                var checkUser = await _db.Users.FindAsync(userId);

                if (checkUser != null)
                {
                    var checkCommunity = await _db.Communities.FindAsync(community.Id);

                    if (checkCommunity != null)
                    {
                        checkUser.Communities.Add(checkCommunity);
                        await _db.SaveChangesAsync();
                        return true;
                    }
                }
                return false;
            }
            catch
            {
                return false;
            }

        }

        public async Task<bool> Unsubscribe(int userId, Community community)
        {
            try
            {
                var checkUser = await _db.Users.FindAsync(userId);

                if (checkUser != null)
                {
                    var checkCommunity = await _db.Communities.FindAsync(community.Id);
                    if (checkCommunity != null)
                    {
                        checkUser.Communities.Remove(checkCommunity);
                        await _db.SaveChangesAsync();
                        return true;
                    }
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> PostExpInfo(Experience exp)
        {
            try
            {

                var checkExp = await _db.Experiences.FirstOrDefaultAsync(x => x.user.Id == exp.user.Id);
                Console.WriteLine(checkExp);
                if (checkExp != null)
                {
                    checkExp.questionRole = exp.questionRole;
                    checkExp.questionBest = exp.questionBest;
                    checkExp.questionChallenging = exp.questionChallenging;
                    checkExp.questionAdvice = exp.questionAdvice;
                    await _db.SaveChangesAsync();
                    return true;
                }
                Console.WriteLine("XP er null");
                return false;
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        public async Task<List<Experience>> GetExperiences(User user) {
            try {
                var userFromDB = await _db.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
                List<Experience> expList = userFromDB.experience.ToList();
                return expList;
            } catch(Exception e) {
                Console.WriteLine(e);
                return null;
            }
            
        }

        public async Task<Experience> GetExperience(int experienceId) {
            try {
                var experienceFromDB = await _db.Experiences.FirstOrDefaultAsync(e => e.Id == experienceId);
                if(experienceFromDB != null) {
                    return experienceFromDB;
                }
                Console.WriteLine("Kunne ikke finne experience i DB");
                return null;
            } catch(Exception e) {
                Console.WriteLine(e);
                return null;
            }
        }

        public async Task<bool> patchExperience(Experience experience) {
            try {
                var experienceFromDB = await _db.Experiences.FirstOrDefaultAsync(e => e.Id == experience.Id);
                if(experienceFromDB != null) {
                    Console.WriteLine(experience.business);
                    experienceFromDB.business = experience.business;
                    experienceFromDB.Industry = experience.Industry;
                    experienceFromDB.StudentSubject = experience.StudentSubject;
                    experienceFromDB.startDate = experience.startDate;
                    experienceFromDB.endDate = experience.endDate;
                    experienceFromDB.occupation = experience.occupation;
                    await _db.SaveChangesAsync();
                    return true;
                }
                return false;
            } catch(Exception e) {
                Console.WriteLine(e);
                return false;
            }
        }

    } // End of class
}
