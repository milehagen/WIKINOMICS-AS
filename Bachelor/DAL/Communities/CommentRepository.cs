﻿using Bachelor.Models.Communities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Communities
{
    public class CommentRepository : ICommentRepository
    {
        private readonly UserDBContext _db;

        public CommentRepository(UserDBContext db)
        {
            _db = db;
        }

        public async Task<bool> PostComment(int postId, Comment inComment)
        {
            try
            {
                var postToChange = await _db.Posts.FindAsync(postId);

                if (postToChange != null)
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

                if (commentToVote != null)
                {
                    if (inComment.Upvotes != 0)
                    {
                        commentToVote.Upvotes += 1;
                    }
                    else if (inComment.Downvotes != 0)
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