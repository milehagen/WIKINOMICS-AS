using Bachelor.DAL.Communities;
using Bachelor.Models.Admin;
using Bachelor.Models.Communities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Controllers.Communities
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _db;

        public CommentController(ICommentRepository db)
        {
            _db = db;
        }

        [HttpPatch("/PostComment/{postId}")]
        [Route("PostComment/{postId}")]
        public async Task<ActionResult> PostComment(int postId, Comment inComment)
        {
            if (ModelState.IsValid)
            {
                var resultOK = await _db.PostComment(postId, inComment);
                if (!resultOK)
                {
                    return NotFound();
                }
                return Ok();
            }
            return BadRequest();
        }

        [HttpPatch("/VoteComment/{commentId}")]
        [Route("VoteComment/{commentId}")]
        public async Task<ActionResult> VoteComment(int commentId, Comment votedComment)
        {
            if (ModelState.IsValid)
            {
                var resultOK = await _db.VoteComment(commentId, votedComment);
                if (!resultOK)
                {
                    return NotFound();
                }
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("/CheckVoteComment")]
        [Route("CheckVoteComment")]
        public async Task<ActionResult> CheckVoteComment(UserCommentVote voteRecord)
        {
            if (ModelState.IsValid)
            {
                var resultCode = await _db.CheckVoteComment(voteRecord);
                if (resultCode < 0)
                {
                    return Ok(-1);
                }
                return Ok(resultCode);
            }
            return BadRequest();
        }

        [HttpPost("/LogVoteComment")]
        [Route("LogVoteComment")]
        public async Task<ActionResult> LogVoteComment(UserCommentVote voteRecord)
        {
            if (ModelState.IsValid)
            {
                var resultOK = await _db.LogVoteComment(voteRecord);
                if (!resultOK)
                {
                    return BadRequest();
                }
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("/Report")]
        [Route("Report")]
        public async Task<ActionResult> Report(CommentReport inReport)
        {
            if (ModelState.IsValid)
            {
                var resultOK = await _db.Report(inReport);
                if (!resultOK)
                {
                    return BadRequest();
                }
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("/Delete/{commentId}")]
        [Route("Delete/{commentId}")]
        public async Task<ActionResult> Delete(int commentId)
        {
            var resultOK = await _db.Delete(commentId);
            if (!resultOK)
            {
                return NotFound();
            }
            return Ok(true);
        }

    }
}
