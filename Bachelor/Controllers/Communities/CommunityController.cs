﻿using Bachelor.DAL.Communities;
using Bachelor.Models;
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
    public class CommunityController : ControllerBase
    {
        private readonly ICommunitiesRepository _db;

        public CommunityController(ICommunitiesRepository db)
        {
            _db = db;
        }

        [HttpGet("/GetAllCommunities")]
        [Route("GetAllCommunities")]
        public async Task<ActionResult> GetAllCommunities()
        {
            List<Community> allCommunities = await _db.GetAllCommunities();
            if (allCommunities.IsNullOrEmpty())
            {
                return NotFound("No communitites found");
            }

            return Ok(allCommunities);
        }

        [HttpGet("/GetCommunitiesByLevel/{level}")]
        [Route("GetCommunitiesByLevel/{level}")]
        public async Task<ActionResult> GetCommunitiesByLevel(int level)
        {
            List<Community> communities = await _db.GetCommunitiesByLevel(level);
            if (communities.IsNullOrEmpty())
            {
                return NotFound("No communitites by that level found");
            }
            return Ok(communities);
        }


        [HttpGet("/GetCommunity/{communityId}")]
        [Route("GetCommunity/{communityId}")]
        public async Task<ActionResult> GetCommunity(int communityId)
        {
            Community community = await _db.GetCommunity(communityId);
            if(community == null)
            {
                return NotFound("No community found by that ID");
            }
            return Ok(community);
        }
    }
}
