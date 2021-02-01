using Bachelor.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL
{
    public class CommunityRepository : ICommunityRepository
    {
        private readonly UserDBContext _db;

        public CommunityRepository(UserDBContext db) 
        {
            _db = db;
        }

        public async Task<List<Community>> GetAllCommunities()
        {
            try
            {
                List<Community> allCommunities = await _db.Communities.Select(c => new Community
                {
                    Id = c.Id,
                    Title = c.Title
                }).ToListAsync();
                return allCommunities;
            }
            catch
            {
                return null;
            }
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

        public async Task<Post> GetPost(int postId)
        {
            try
            {
                Post foundPost = await _db.Posts.FirstOrDefaultAsync(p => p.Id == postId);
                return foundPost;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> Publish(Post inPost)
        {
            System.Diagnostics.Debug.WriteLine("REPOSITORY DATETIME: " + inPost);
            try
            {
                var checkCommunity = await _db.Communities.FindAsync(inPost.Community.Id);
                if(checkCommunity != null)
                {
                    var newPost = new Post();
                    newPost.Community = checkCommunity;
                    newPost.Text = inPost.Text;
                    newPost.UserID = inPost.UserID;
                    newPost.Date = inPost.Date;
                    newPost.Upvotes = inPost.Upvotes;
                    newPost.Downvotes = inPost.Downvotes;

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

                if(postToVote != null)
                {
                    if(inPost.Upvotes != 0)
                    {
                        postToVote.Upvotes += 1;
                    }
                    else if(inPost.Downvotes != 0)
                    {
                        postToVote.Downvotes += 1;
                    } 
                    else { return false; }

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

        public async Task<bool> PostComment(int postId, Comment inComment)
        {
            try
            {
                var postToChange = await _db.Posts.FindAsync(postId);

                if(postToChange != null)
                {
                    var newComment = new Comment
                    {
                        Text = inComment.Text,
                        UserID = inComment.UserID,
                        Post = postToChange,
                        Date = inComment.Date,
                        Upvotes = inComment.Upvotes,
                        Downvotes = inComment.Downvotes
                    };
                    postToChange.Comment.Add(newComment);
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

        public async Task<bool> VoteComment(int commentId, Comment inComment)
        {
            try
            {
                var commentToVote = await _db.Comments.FindAsync(commentId);

                if(commentToVote != null)
                {
                    if(inComment.Upvotes != 0)
                    {
                        commentToVote.Upvotes += 1;
                    }
                    else if(inComment.Downvotes != 0)
                    {
                        commentToVote.Downvotes += 1;
                    }
                    else { return false; }

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
