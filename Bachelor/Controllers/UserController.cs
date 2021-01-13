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
    }
}
