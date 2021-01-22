using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bachelor.DAL;
using Bachelor.Models;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        public async Task<ActionResult> GetAllUsers()
        {
            List<User> allUsers = await _db.GetAllUsers();
            return Ok(allUsers);
        }

        [HttpPost]
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
    }
}
