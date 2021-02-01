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

        Task<List<Post>> GetPostsFromCommunity(int communityId);

        Task<Post> GetPost(int postId);

        Task<bool> Publish(Post inPost);

        Task<bool> VotePost(int postId, Post inPost);

        Task<bool> PostComment(int postId, Comment comment);

        Task<bool> VoteComment(int commentId, Comment comment);
    }
}
