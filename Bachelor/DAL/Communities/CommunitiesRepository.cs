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
                if(checkCommunity != null)
                {
                    var newPost = new Post();
                    newPost.Community = checkCommunity;
                    newPost.Text = inPost.Text;
                    newPost.UserID = inPost.UserID;
                    newPost.Date = inPost.Date;
                    newPost.Upvotes = inPost.Upvotes;
                    newPost.Downvotes = inPost.Downvotes;

                    //If the post should have a tag
                    if(inPost.PostTag != null)
                    {
                        var checkPostTag = await _db.PostTags.FindAsync(inPost.PostTag.Id);                    
                        newPost.PostTag = checkPostTag;
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

                if(postToVote != null)
                {
                    if(inPost.Upvotes != 0)
                    {
                        postToVote.Upvotes += inPost.Upvotes;
                    }
                    if(inPost.Downvotes != 0)
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
                if(voteRecordFound == null || voteRecordFound.Voted == 0)
                {
                    return 0;
                }
                //User has already upvoted
                else if (voteRecordFound.Voted == 1)
                {
                    return 1;
                }
                //User has already downvoted
                else if(voteRecordFound.Voted == -1)
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

                if(voteRecordFound != null)
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