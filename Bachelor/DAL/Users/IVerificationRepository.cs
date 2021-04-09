using Bachelor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Users
{
    public interface IVerificationRepository
    {

        Task<bool> CheckMail(string address);

        Task<bool> SendVerification(int experienceID, string address);

        Task<bool> Verify(int experienceID);
    }
}
