using Bachelor.Models;
using Bachelor.Models.Communities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Communities
{
    public interface ICommunitiesRepository
    {
        Task<List<Community>> GetAllCommunities();

        Task<Community> GetCommunity(int communityId);

    }
}
