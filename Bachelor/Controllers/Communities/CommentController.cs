using Bachelor.DAL.Communities;
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
                    return NotFound("The post the comment was supposed to be added too, was not found");
                }
                return Ok("Comment posted");
            }
            return BadRequest("Wrong input validation");
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
                    return NotFound("The comment was not found");
                }
                return Ok("Comment voted on");
            }
            return BadRequest("Wrong input validation");
        }

    }
}
