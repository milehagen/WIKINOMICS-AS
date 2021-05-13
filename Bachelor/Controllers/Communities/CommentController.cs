using Bachelor.DAL.Storage;
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
        private readonly IJwtTokenRepository _jwt;

        public CommentController(ICommentRepository db, IJwtTokenRepository jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        [HttpPatch("/PostComment/{postId}")]
        [Route("PostComment/{postId}")]
        public async Task<ActionResult> PostComment(int postId, Comment inComment)
        {
            try
            {
                bool access = _jwt.ValidateWithAccess(HttpContext, inComment.User.Id);
                if (!access)
                {
                    return Unauthorized(false);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(false);
            }
            if (ModelState.IsValid)
            {
                var resultOK = await _db.PostComment(postId, inComment);
                if (!resultOK)
                {
                    return NotFound(false);
                }
                return Ok(true);
            }
            return BadRequest(ModelState);
        }

        [HttpPatch]
        [Route("VoteComment/{commentId}")]
        public async Task<ActionResult> VoteComment(int commentId, Comment votedComment)
        {
            try
            {
                bool access = _jwt.ValidateWithAccess(HttpContext, votedComment.User.Id);
                if (!access)
                {
                    return Unauthorized(false);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(false);
            }

            if (ModelState.IsValid)
            {
                var resultOK = await _db.VoteComment(commentId, votedComment);
                if (!resultOK)
                {
                    return NotFound(false);
                }
                return Ok(true);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("/CheckVoteComment")]
        [Route("CheckVoteComment")]
        public async Task<ActionResult> CheckVoteComment(UserCommentVote voteRecord)
        {
            try
            {
                bool access = _jwt.ValidateWithAccess(HttpContext, voteRecord.UserId);
                if (!access)
                {
                    return Unauthorized(-1);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(-1);
            }

            if (ModelState.IsValid)
            {
                var resultCode = await _db.CheckVoteComment(voteRecord);
                if (resultCode < 0)
                {
                    return Ok(-1);
                }
                return Ok(resultCode);
            }
            return BadRequest(ModelState);
        }

        [HttpPost("/LogVoteComment")]
        [Route("LogVoteComment")]
        public async Task<ActionResult> LogVoteComment(UserCommentVote voteRecord)
        {
            try
            {
                bool access = _jwt.ValidateWithAccess(HttpContext, voteRecord.UserId);
                if (!access)
                {
                    return Unauthorized(false);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(false);
            }
            if (ModelState.IsValid)
            {
                var resultOK = await _db.LogVoteComment(voteRecord);
                if (!resultOK)
                {
                    return NotFound(false);
                }
                return Ok(true);
            }
            return BadRequest(ModelState);
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
                    return NotFound(false);
                }
                return Ok(true);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("/Delete/{commentId}")]
        [Route("Delete/{commentId}")]
        public async Task<ActionResult> Delete(int commentId)
        {
            var resultOK = await _db.Delete(commentId);
            if (!resultOK)
            {
                return NotFound(false);
            }
            return Ok(true);
        }

    }
}
