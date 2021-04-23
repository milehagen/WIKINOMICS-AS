using Bachelor.DAL.Communities;
using Bachelor.Models.Admin;
using Bachelor.Models.Communities;
using Castle.Core.Internal;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Controllers.Communities
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _db;

        public PostController(IPostRepository db)
        {
            _db = db;
        }

        [HttpGet]
        [Route("GetPostsFromCommunity/{communityId}")]
        public async Task<ActionResult> GetPostsFromCommunity(int communityId)
        {
            List<Post> postsFromCommunity = await _db.GetPostsFromCommunity(communityId);
            if (postsFromCommunity.IsNullOrEmpty())
            {
                return NotFound();
            }
            return Ok(postsFromCommunity);
        }

        [HttpGet]
        [Route("PaginateFromCommunity/{communityId}/{page}")]
        public async Task<ActionResult> PaginateFromCommunity(int communityId, int page)
        {
            List<Post> paginatedPosts = await _db.PaginateFromCommunity(communityId, page);
            if (paginatedPosts.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(paginatedPosts);
        }

        [HttpGet]
        [Route("PaginateForUser/{userId}/{page}")]
        public async Task<ActionResult> PaginateForUser(int userId, int page)
        {
            List<Post> paginatedPosts = await _db.PaginateForUser(userId, page);
            if (paginatedPosts.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(paginatedPosts);
        }


        [HttpGet]
        [Route("PaginatePosts/{page}")]
        public async Task<ActionResult> PaginatePosts(int page)
        {
            List<Post> paginatedPosts = await _db.PaginatePosts(page);
            if (paginatedPosts.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(paginatedPosts);
        }

        [HttpGet]
        [Route("GetTrending")]
        public async Task<ActionResult> GetTrending()
        {
            List<Post> trendingPosts = await _db.GetTrending();
            if (trendingPosts.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(trendingPosts);
        }

        [HttpGet]
        [Route("GetPost/{postId}")]
        public async Task<ActionResult> GetPost(int postId)
        {
            Post post = await _db.GetPost(postId);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet]
        [Route("GetPostTags")]
        public async Task<ActionResult> GetPostTags()
        {
            List<PostTag> postTags = await _db.GetPostTags();
            return Ok(postTags);
        }

        [HttpPost]
        [Route("Publish")]
        public async Task<ActionResult> Publish(Post inPost)
        {
            if (ModelState.IsValid)
            {
                var resultOK = await _db.Publish(inPost);
                if (!resultOK)
                {
                    return BadRequest();
                }
                return Ok();
            }
            return BadRequest();
        }

        [HttpPatch]
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

        [HttpPost]
        [Route("CheckVotePost")]
        public async Task<ActionResult> CheckVotePost(UserPostVote obj)
        {
            if (ModelState.IsValid)
            {
                var resultCode = await _db.CheckVotePost(obj);
                if (resultCode < 0)
                {
                    return Ok(-1);
                }
                return Ok(resultCode);
            }
            return BadRequest("Wrong input validation");
        }

        [HttpPost]
        [Route("LogVotePost")]
        public async Task<ActionResult> LogVotePost(UserPostVote voteRecord)
        {
            if (ModelState.IsValid)
            {
                var resultOK = await _db.LogVotePost(voteRecord);
                if (!resultOK)
                {
                    return BadRequest("Vote could not be logged");
                }
                return Ok("User vote was logged");
            }
            return BadRequest("Wrong input validation");
        }

        [HttpPost]
        [Route("Report")]
        public async Task<ActionResult> Report(PostReport inReport)
        {
            if (ModelState.IsValid)
            {
                var resultOK = await _db.Report(inReport);
                if (!resultOK)
                {
                    return BadRequest("Post could not be reported");
                }
                return Ok("Post was reported");
            }
            return BadRequest("Wrong input validation");
        }

        [HttpDelete]
        [Route("Delete/{postId}")]
        public async Task<ActionResult> Delete(int postId)
        {
            var resultOK = await _db.Delete(postId);
            if (!resultOK)
            {
                return NotFound();
            }
            return Ok(true);
        }
    }
}
