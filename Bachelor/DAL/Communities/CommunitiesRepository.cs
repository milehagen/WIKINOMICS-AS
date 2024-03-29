﻿
using Bachelor.Models.Communities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Communities
{
    public class CommunitiesRepository : ICommunitiesRepository
    {
        private readonly UserDBContext _db;

        public CommunitiesRepository(UserDBContext db) 
        {
            _db = db;
        }

        public async Task<List<Community>> GetAllCommunities()
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

        public async Task<List<Community>> GetCommunitiesByLevel(int level)
        {
            try
            {
                List<Community> communities = await _db.Communities.Where(c => c.Level == level).ToListAsync();
                return communities;
            }
            catch
            {
                return null;
            }
        }





        public async Task<Community> GetCommunity(int communityId)
        {
            try
            {
                Community foundCommunity = await _db.Communities.FindAsync(communityId);
                return foundCommunity;
            }
            catch
            {
                return null;
            }
        }
    }
}
