using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bachelor.DAL;
using Bachelor.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Bachelor.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _db;

        public UserController(IUserRepository db)
        {
            _db = db;
        }

        [HttpGet("/GetAllUsers")]
        [Route("GetAllUsers")]
        public async Task<ActionResult> GetAllUsers()
        {
            List<User> allUsers = await _db.GetAllUsers();
            return Ok(allUsers);
        }

        [HttpPost("/addUser")]
        [Route("addUser")]
        public async Task<ActionResult> addUser(User user)
        {
            if(ModelState.IsValid)
            {
                bool returOK = await _db.addUser(user);
                if(!returOK)
                {
                    return BadRequest();
                }
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost("/LogIn")]
        [Route("LogIn")]
        public async Task<ActionResult> LogIn(User user)
        {
            if(ModelState.IsValid)
            {
                bool returOK = await _db.LogIn(user);
                if(!returOK)
                {
                    return BadRequest();
                }
                return Ok();
            }

            return BadRequest();
        }

    }
}
