﻿using Bachelor.Models.Admin;
using Bachelor.Models.Communities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Communities
{
    public interface ICommentRepository
    {
        Task<bool> PostComment(int postId, Comment comment);

        Task<bool> VoteComment(int commentId, Comment comment);

        Task<int> CheckVoteComment(UserCommentVote voteRecord);

        Task<bool> LogVoteComment(UserCommentVote voteRecord);

        Task<bool> Report(CommentReport report);

        Task<bool> Delete(int commentId);
    }
}

