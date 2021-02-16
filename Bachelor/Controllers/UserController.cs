using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bachelor.DAL;
using Bachelor.Models;
using Microsoft.AspNetCore.Http;
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

        [HttpPost("/AddUser")]
        [Route("AddUser")]
        public async Task<ActionResult> AddUser(User user)
        {
            if(ModelState.IsValid)
            {
                bool returOK = await _db.AddUser(user);
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
            if (ModelState.IsValid)
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

        // Takes in email, find the user id and generates a token a creates a cookie
        [HttpGet("/GetToken/{userEmail}")]
        [Route("GetToken/{userEmail}")]
        public async Task<ActionResult> GetToken(string userEmail)
        {
            
            JwtTokenRepository jwt = new JwtTokenRepository();
            int id = _db.FindId(userEmail);
            string token = jwt.GenerateToken(id);

            // Endre på senere - oppretter en cookie som var i 30 sek
            TimeSpan Ts = TimeSpan.FromSeconds(300);
            string cookiename = "userid";
            HttpContext.Response.Cookies.Append(cookiename, token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                MaxAge = Ts
            });

            return Ok(token);
        }

    } // End class
}
