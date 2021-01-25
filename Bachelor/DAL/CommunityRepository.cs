using Bachelor.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL
{
    public class CommunityRepository : ICommunityRepositorycs
    {
        private readonly UserDBContext _db;

        public CommunityRepository(UserDBContext db) 
        {
            _db = db;
        }

        public async Task<List<Community>> GetAll()
        {
            try
            {
                List<Community> allCommunities = await _db.Communities.ToListAsync();
                return allCommunities;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> Publish(Post inPost)
        {
            try
            {
                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
