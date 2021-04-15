using Bachelor.Models;
using Bachelor.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Users
{
    public interface IVerificationRepository
    {

        Task<List<Domain>> GetVerified();

        Task<List<Domain>> GetUnverified();

        Task<bool> CheckMail(string address);

        Task<bool> SendVerification(int experienceID, string address);

        Task<bool> Verify(int experienceID);

        Task<bool> AddToReview(Domain domain);

        Task<bool> Add(Domain domain);

        Task<bool> Delete(string domain);
    }
}
