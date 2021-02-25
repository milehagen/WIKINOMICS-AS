using Bachelor.Models.Admin;
using Bachelor.Models.Communities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Communities
{
    public interface IPostRepository
    {
        Task<List<Post>> GetPostsFromCommunity(int communityId);

        Task<Post> GetPost(int postId);

        Task<List<PostTag>> GetPostTags();

        Task<bool> Publish(Post inPost);

        Task<bool> VotePost(int postId, Post inPost);

        Task<int> CheckVotePost(UserPostVote obj);

        Task<bool> LogVotePost(UserPostVote obj);

        Task<bool> Report(PostReport report);

        Task<bool> Delete(int postId);
    }
}
