using Bachelor.Models.Admin;
using Bachelor.Models.Communities;
using Castle.Core.Internal;
using Microsoft.EntityFrameworkCore;
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
                var checkUser = await _db.Users.FindAsync(inComment.User.Id);

                if (postToChange != null && checkUser != null)
                {
                    var newComment = new Comment
                    {
                        Text = inComment.Text,
                        User = checkUser,
                        Post = postToChange,
                        Date = inComment.Date,
                        Upvotes = inComment.Upvotes,
                        Downvotes = inComment.Downvotes,
                        Anonymous = inComment.Anonymous
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
                        commentToVote.Upvotes += inComment.Upvotes;
                    }
                    if (inComment.Downvotes != 0)
                    {
                        commentToVote.Downvotes += inComment.Downvotes;
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


        public async Task<int> CheckVoteComment(UserCommentVote voteRecord)
        {
            try
            {
                var voteRecordFound = await _db.UserCommentVotes.FirstOrDefaultAsync(v => v.UserId == voteRecord.UserId && v.CommentId == voteRecord.CommentId);

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

        public async Task<bool> LogVoteComment(UserCommentVote voteRecord)
        {
            try
            {
                var voteRecordFound = await _db.UserCommentVotes.FirstOrDefaultAsync(v => v.UserId == voteRecord.UserId && v.CommentId == voteRecord.CommentId);

                if (voteRecordFound != null)
                {
                    voteRecordFound.Voted = voteRecord.Voted;
                }
                else
                {
                    await _db.UserCommentVotes.AddAsync(voteRecord);
                }
                await _db.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Report(CommentReport inReport)
        {
            try
            {
                var checkComment = await _db.Comments.FindAsync(inReport.Comment.Id);

                if (checkComment != null)
                {
                    //Checking if the comment has already been reported
                    var alreadyReported = await _db.CommentReports.FirstOrDefaultAsync(rc => rc.Comment.Id == checkComment.Id);
                    if (alreadyReported != null)
                    {
                        alreadyReported.LastReportDate = inReport.LastReportDate;
                        alreadyReported.NumberOfReports++;

                        await _db.SaveChangesAsync();
                        return true;
                    }

                    //If not already reported, it's a fresh report
                    var newReport = new CommentReport
                    {
                        Comment = checkComment,
                        LastReportDate = inReport.LastReportDate,
                        NumberOfReports = 1
                    };

                    await _db.CommentReports.AddAsync(newReport);
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

        public async Task<bool> Delete(int commentId)
        {
            try
            {
                var commentToDelete = await _db.Comments.FindAsync(commentId);
                if (commentToDelete != null)
                {
                    //Deleting vote records on comment
                    List<UserCommentVote> commentVotes = await _db.UserCommentVotes.Where(vr => vr.CommentId == commentId).ToListAsync();
                    if (!commentVotes.IsNullOrEmpty())
                    {
                        _db.UserCommentVotes.RemoveRange(commentVotes);
                    }

                    //Deleting report record on comment
                    var commentReport = await _db.CommentReports.FirstOrDefaultAsync(r => r.Comment.Id == commentId);
                    if (commentReport != null)
                    {
                        _db.CommentReports.Remove(commentReport);
                    }

                    _db.Comments.Remove(commentToDelete);
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

