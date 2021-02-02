using Bachelor.DAL;
using Bachelor.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommunityController : ControllerBase
    {
        private readonly ICommunityRepository _db;

        public CommunityController(ICommunityRepository db)
        {
            _db = db;
        }

        [HttpGet("/GetAllCommunities")]
        [Route("GetAllCommunities")]
        public async Task<ActionResult> GetAllCommunities()
        {
            List<Community> allCommunities = await _db.GetAllCommunities();
            return Ok(allCommunities);
        }

        [HttpGet("/GetCommunity/{communityId}")]
        [Route("GetCommunity/{communityId}")]
        public async Task<ActionResult> GetCommunity(int communityId)
        {
            Community community = await _db.GetCommunity(communityId);
            if(community == null)
            {
                return NotFound("Community not found");
            }
            return Ok(community);
        }


        [HttpGet("/GetPostsFromCommunity/{communityId}")]
        [Route("GetPostsFromCommunity/{communityId}")]
        public async Task<ActionResult> GetPostsFromCommunity(int communityId)
        {
            List<Post> postsFromCommunity = await _db.GetPostsFromCommunity(communityId);
            return Ok(postsFromCommunity);
        }

        [HttpGet("/GetPost/{postId}")]
        [Route("GetPost/{postId}")]
        public async Task<ActionResult> GetPost(int postId)
        {
            Post post = await _db.GetPost(postId);
            if(post == null)
            {
                return NotFound("Post not found");
            }
            return Ok(post);
        }

        [HttpPost("/Publish")]
        [Route("Publish")]
        public async Task<ActionResult> Publish(Post inPost)
        {
            System.Diagnostics.Debug.WriteLine("CONTROLLER DATETIME: " + inPost.Date);
            if (ModelState.IsValid)
            {
                var resultOK = await _db.Publish(inPost);
                if (!resultOK)
                {
                    return BadRequest("Post could not be published");
                }
                return Ok("Post published");
            }
            return BadRequest("Wrong input validation");
        }

        [HttpPatch("/VotePost/{postId}")]
        [Route("VotePost/{postId}")]
        public async Task<ActionResult> VotePost(int postId, Post inPost)
        {
            if (ModelState.IsValid)
            {
                var resultOK = await _db.VotePost(postId, inPost);
                if (!resultOK)
                {
                    return NotFound("The post was not found");
                }
                return Ok("Post was voted on");
            }
            return BadRequest("Wrong input validation");
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
            System.Diagnostics.Debug.WriteLine("Id of comment to vote on: " + commentId + " upvotes: " + votedComment.Upvotes + " downvotes: " + votedComment.Downvotes);
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
