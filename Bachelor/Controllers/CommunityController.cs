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

    }
}
