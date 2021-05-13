using Bachelor.DAL.Storage;
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
        private readonly IJwtTokenRepository _jwt;

        public PostController(IPostRepository db, IJwtTokenRepository jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        [HttpGet]
        [Route("GetPostsFromCommunity/{communityId}")]
        public async Task<ActionResult> GetPostsFromCommunity(int communityId)
        {
            List<Post> postsFromCommunity = await _db.GetPostsFromCommunity(communityId);
            if (postsFromCommunity.IsNullOrEmpty())
            {
                return NotFound("No posts found");
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
                return NotFound("No posts found");
            }

            return Ok(paginatedPosts);
        }

        [HttpGet]
        [Route("PaginateForUser/{userId}/{page}")]
        public async Task<ActionResult> PaginateForUser(int userId, int page)
        {
            try
            {
                bool access = _jwt.ValidateWithAccess(HttpContext, userId);
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

            List<Post> paginatedPosts = await _db.PaginateForUser(userId, page);
            if (paginatedPosts.IsNullOrEmpty())
            {
                return NotFound("No posts found");
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
                return NotFound("No posts found");
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
                return NotFound("No posts found");
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
                return NotFound("Post not found");
            }
            return Ok(post);
        }

        [HttpGet]
        [Route("GetPostTags")]
        public async Task<ActionResult> GetPostTags()
        {
            List<PostTag> postTags = await _db.GetPostTags();
            if (postTags.IsNullOrEmpty())
            {
                return NotFound("No posttags found");
            }
            return Ok(postTags);
        }

        [HttpPost]
        [Route("Publish")]
        public async Task<ActionResult> Publish(Post inPost)
        {
            try
            {
                bool access = _jwt.ValidateWithAccess(HttpContext, inPost.User.Id);
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
                var resultOK = await _db.Publish(inPost);
                if (!resultOK)
                {
                    return NotFound(false);
                }
                return Ok(true);
            }
            return BadRequest(ModelState);
        }

        [HttpPatch]
        [Route("VotePost/{postId}")]
        public async Task<ActionResult> VotePost(int postId, Post inPost)
        {
            try
            {
                bool access = _jwt.ValidateWithAccess(HttpContext, inPost.User.Id);
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
                var resultOK = await _db.VotePost(postId, inPost);
                if (!resultOK)
                {
                    return NotFound("The post was not found");
                }
                return Ok(true);
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        [Route("CheckVotePost")]
        public async Task<ActionResult> CheckVotePost(UserPostVote obj)
        {
            try
            {
                bool access = _jwt.ValidateWithAccess(HttpContext, obj.UserId);
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
                var resultCode = await _db.CheckVotePost(obj);
                if (resultCode < 0)
                {
                    return Ok(-1);
                }
                return Ok(resultCode);
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
        [Route("LogVotePost")]
        public async Task<ActionResult> LogVotePost(UserPostVote voteRecord)
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
                var resultOK = await _db.LogVotePost(voteRecord);
                if (!resultOK)
                {
                    return NotFound("Vote could not be logged");
                }
                return Ok(true);
            }
            return BadRequest(ModelState);
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
                    return NotFound("Post could not be reported");
                }
                return Ok(true);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete]
        [Route("Delete/{postId}")]
        public async Task<ActionResult> Delete(int postId)
        {
            var resultOK = await _db.Delete(postId);
            if (!resultOK)
            {
                return NotFound("Post not found");
            }
            return Ok(true);
        }
    }
}
