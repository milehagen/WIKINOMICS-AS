﻿using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bachelor.Models;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Bachelor.Models.Communities;
using Bachelor.Models.Users;

namespace Bachelor.DAL
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
            if(CheckIfRegistered(user))
            {
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
                newUser.Occupation = user.Occupation;
                newUser.Gender = user.Gender;
                newUser.Role = "user";
                newUser.Communities = new List<Community>();

                var checkIndustry = await _db.Industries.FindAsync(user.Industry.Id);
                if(checkIndustry != null)
                {
                    newUser.Industry = checkIndustry;
                }

                var checkCommunity = await _db.Communities.FirstOrDefaultAsync(c => c.Title == user.Industry.Title);
                if(checkCommunity != null)
                {
                    newUser.Communities.Add(checkCommunity);
                }

                await _db.Users.AddAsync(newUser);
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
                User userFromDB = await _db.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
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
            } catch
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
            } catch
            {
                return null;
            }
            
        }
        

        ///\\\ HELPING METHODS \\\///

        public int FindId(string userEmail)
        {
            User UserFromDB = _db.Users.FirstOrDefault(u => u.Email == userEmail);
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
            User UserFromDB = _db.Users.FirstOrDefault(u => u.Email == user.Email);
            if(UserFromDB == null)
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

                if(checkUser != null)
                {
                    var checkCommunity = await _db.Communities.FindAsync(community.Id);

                    if(checkCommunity != null)
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

                if(checkUser != null)
                {
                    var checkCommunity = await _db.Communities.FindAsync(community.Id);
                    if(checkCommunity != null)
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
    } // End of class
}