using Bachelor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL
{
    public interface ICommunityRepository
    {
        Task<List<Community>> GetAllCommunities();

        Task<List<Post>> GetPostsFromCommunity(int communityID);

        Task<bool> Publish(Post inPost);
    }
}
