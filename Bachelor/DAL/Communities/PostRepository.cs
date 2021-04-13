using Bachelor.Models.Admin;
using Bachelor.Models.Communities;
using Castle.Core.Internal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MoreLinq;
using Bachelor.Models;

namespace Bachelor.DAL.Communities
{
    public class PostRepository: IPostRepository
    {
        private readonly UserDBContext _db;

        public PostRepository(UserDBContext db)
        {
            _db = db;
        }

        public async Task<List<Post>> GetPostsFromCommunity(int communityId)
        {
            try
            {
                List<Post> postsFromCommunity = await _db.Posts.Where(p => p.Community.Id == communityId).ToListAsync();
                return postsFromCommunity;
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<Post>> PaginateFromCommunity(int communityId, int page)
        {
            try
            {
                List<Post> posts = new List<Post>();

                Community community = await _db.Communities.FindAsync(communityId);
                if(community != null)
                {
                    //If community doesn't have any sub-communities
                    if (community.Communities.IsNullOrEmpty())
                    {
                        posts = await _db.Posts.Where(p => p.Community.Id == communityId).OrderByDescending(p => p.Date).Skip(page).Take(2).ToListAsync();
                    }
                    else
                    {
                        posts = await _db.Posts.Where(p => p.Community.Id == communityId).OrderByDescending(p => p.Date).Skip(page).Take(2).ToListAsync();

                        community.Communities.ForEach(async c => posts.AddRange(
                            await _db.Posts.Where(p => p.Community.Id == c.Id)
                            .OrderByDescending(p => p.Date)
                            .Skip(page)
                            .Take(2)
                            .ToListAsync()));
                    }
                }
                else
                {
                    throw new Exception("Community was not found");
                }
                return posts;
            }
            catch(Exception e)
            {
                Console.WriteLine("{0} Exception caught.", e);
                return null;
            }
        }

        public async Task<List<Post>> PaginatePosts(int page)
        {
            try
            {

                List<Post> posts = await _db.Posts.OrderByDescending(p => p.Date).Skip(page).Take(2).ToListAsync();
                return posts;

            }
            catch
            {
                return null;
            }
        }

        public async Task<List<Post>> PaginateForUser(int userID, int page)
        {
            try
            {
                User foundUser = await _db.Users.FindAsync(userID);
                if(foundUser != null)
                {
                    List<Post> posts = new List<Post>();

                    //Loops through users communities, getting posts from those communities
                    //In a pagination fashion
                    foundUser.Communities.ForEach(async c => posts.AddRange(
                        await _db.Posts.Where(p => p.Community.Id == c.Id)
                        .OrderByDescending(p => p.Date)
                        .Skip(page)
                        .Take(2)
                        .ToListAsync()));
                }
                return null;
            }
            catch
            {
                return null;
            }
        }


        public async Task<List<Post>> GetTrending()
        {
            try
            {
                List<Post> trendingPosts = await _db.Posts.OrderByDescending(p => (p.Upvotes - p.Downvotes)).Where(p => (p.Upvotes - p.Downvotes) > 0).Take(10).ToListAsync();
                return trendingPosts;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Post> GetPost(int postId)
        {
            try
            {
                Post foundPost = await _db.Posts.FindAsync(postId);
                return foundPost;
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<PostTag>> GetPostTags()
        {
            try
            {
                List<PostTag> allPostTags = await _db.PostTags.ToListAsync();
                return allPostTags;
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
                var checkCommunity = await _db.Communities.FindAsync(inPost.Community.Id);
                var checkUser = await _db.Users.FindAsync(inPost.User.Id);

                if (checkCommunity != null && checkUser != null)
                {
                    var newPost = new Post();
                    newPost.Community = checkCommunity;
                    newPost.Text = inPost.Text;
                    newPost.User = checkUser;
                    newPost.Date = inPost.Date;
                    newPost.Upvotes = inPost.Upvotes;
                    newPost.Downvotes = inPost.Downvotes;
                    newPost.Anonymous = inPost.Anonymous;

                    //If the post should have a tag
                    if (inPost.PostTag != null)
                    {
                        var checkPostTag = await _db.PostTags.FindAsync(inPost.PostTag.Id);
                        newPost.PostTag = checkPostTag;
                    }

                    //If an Experience should be added to the post
                    if(inPost.Experience != null)
                    {
                        var checkExperience = await _db.Experiences.FindAsync(inPost.Experience.Id);
                        newPost.Experience = checkExperience;
                    }

                    await _db.Posts.AddAsync(newPost);
                    await _db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> VotePost(int postId, Post inPost)
        {
            try
            {
                var postToVote = await _db.Posts.FindAsync(postId);

                if (postToVote != null)
                {
                    if (inPost.Upvotes != 0)
                    {
                        postToVote.Upvotes += inPost.Upvotes;
                    }
                    if (inPost.Downvotes != 0)
                    {
                        postToVote.Downvotes += inPost.Downvotes;
                    }

                    await _db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }

        }

        public async Task<int> CheckVotePost(UserPostVote voteRecord)
        {
            try
            {
                var voteRecordFound = await _db.UserPostVotes.FirstOrDefaultAsync(v => v.UserId == voteRecord.UserId && v.PostId == voteRecord.PostId);

                //If you've never voted you are allowed to do so
                if (voteRecordFound == null || voteRecordFound.Voted == 0)
                {
                    return 0;
                }
                //User has already upvoted
                else if (voteRecordFound.Voted == 1)
                {
                    return 1;
                }
                //User has already downvoted
                else if (voteRecordFound.Voted == -1)
                {
                    return 2;
                }
                return -1;
            }
            catch
            {
                return -1;
            }
        }

        public async Task<bool> LogVotePost(UserPostVote voteRecord)
        {
            try
            {
                var voteRecordFound = await _db.UserPostVotes.FirstOrDefaultAsync(v => v.UserId == voteRecord.UserId && v.PostId == voteRecord.PostId);

                if (voteRecordFound != null)
                {
                    voteRecordFound.Voted = voteRecord.Voted;
                }
                else
                {
                    await _db.UserPostVotes.AddAsync(voteRecord);
                }
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Report (PostReport inReport)
        {
            try
            {
                var checkPost = await _db.Posts.FindAsync(inReport.Post.Id);

                if(checkPost != null)
                {

                    //Checking if the post has already been reported
                    var alreadyReported = await _db.PostReports.FirstOrDefaultAsync(rp => rp.Post.Id == checkPost.Id);
                    if(alreadyReported != null)
                    {
                        alreadyReported.LastReportDate = inReport.LastReportDate;
                        alreadyReported.NumberOfReports++;

                        await _db.SaveChangesAsync();
                        return true;
                    }

                    var newReport = new PostReport
                    {
                        Post = checkPost,
                        LastReportDate = inReport.LastReportDate,
                        NumberOfReports = 1
                    };

                    await _db.PostReports.AddAsync(newReport);
                    await _db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Delete(int postId)
        {
            try
            {
                var postToDelete = await _db.Posts.FindAsync(postId);
                if(postToDelete != null)
                {
                    //Deleting the comments attached
                    if (!postToDelete.Comment.IsNullOrEmpty())
                    {
                        
                        List<UserCommentVote> commentVotes = new List<UserCommentVote>();
                        List<CommentReport> commentReports = new List<CommentReport>();

                        //Finds all vote records and reports on comments that are connected to post, deletes them
                        foreach(Comment comment in postToDelete.Comment)
                        {
                            var commentVote = await _db.UserCommentVotes.FirstOrDefaultAsync(vr => vr.CommentId == comment.Id);
                            if(commentVote != null)
                            {
                                commentVotes.Add(commentVote);
                            }

                            var commentReport = await _db.CommentReports.FirstOrDefaultAsync(r => r.Comment.Id == comment.Id);
                            if(commentReport != null)
                            {
                                commentReports.Add(commentReport);
                            }
                        }

                        if (!commentReports.IsNullOrEmpty())
                        {
                            _db.CommentReports.RemoveRange(commentReports);
                        }
                        
                        if (!commentVotes.IsNullOrEmpty())
                        {
                            _db.UserCommentVotes.RemoveRange(commentVotes);
                        }


                        _db.Comments.RemoveRange(postToDelete.Comment);
                    }

                    //Deleting vote records on post
                    List<UserPostVote> postVotes = await _db.UserPostVotes.Where(vr => vr.PostId == postId).ToListAsync();
                    if (!postVotes.IsNullOrEmpty())
                    {
                        _db.UserPostVotes.RemoveRange(postVotes);
                    }

                    //Deleting report record on post
                    var postReport = await _db.PostReports.FirstOrDefaultAsync(r => r.Post.Id == postId);
                    if(postReport != null)
                    {
                        _db.PostReports.Remove(postReport);
                    }


                    _db.Posts.Remove(postToDelete);
                    await _db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }
    }
}
