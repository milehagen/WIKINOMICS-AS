using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bachelor.DAL;
using Bachelor.Models;
using Bachelor.Models.Communities;
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

        [HttpGet("/GetUser/{userID}")]
        [Route("GetUser/{userID}")]
        public async Task<ActionResult> GetUser(int userID)
        {
            User foundUser = await _db.GetUser(userID);
            if(foundUser != null)
            {
                return Ok(foundUser);
            }
            return NotFound();

        }

        [HttpPost("/addUser")]
        [Route("addUser")]
        public async Task<ActionResult> addUser(User user)
        {
            System.Diagnostics.Debug.WriteLine(user.Firstname + "" + user.Lastname + " " + user.Industry.Title + " " + user.Password + " " + user.Email + "" + user.Age);
            if (ModelState.IsValid)
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

            // Lasting for 1 hour
            string cookiename = "userid";
            HttpContext.Response.Cookies.Append(cookiename, token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                MaxAge = TimeSpan.FromSeconds(3600),
                SameSite = SameSiteMode.Strict
            });
            return Ok(token);
        }

        [HttpGet("/CreateAnonymousCookie")]
        [Route("CreateAnonymousCookie")]
        public async Task<ActionResult> CreateAnonymousCookie()
        {
            Console.WriteLine("Start cookie");
            var cookiename = "guest";
            HttpContext.Response.Cookies.Append(cookiename, "", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                MaxAge = TimeSpan.FromSeconds(600)
            });

            return Ok();
        }


        [HttpGet("/GetAllIndustries")]
        [Route("GetAllIndustries")]
        public async Task<ActionResult> GetAllIndustries()
        {
            List<Industry> occupations = await _db.GetAllIndustries();
            if(occupations == null)
            {
                return NotFound("Occupations not found");
            }

            return Ok(occupations);
        }

        [HttpPatch("/Subscribe/{userId}")]
        [Route("Subscribe/{userId}")]
        public async Task<ActionResult> Subscribe(int userId, Community community)
        {
            if (ModelState.IsValid)
            {
                var resultOK = await _db.Subscribe(userId, community);
                if (!resultOK)
                {
                    return NotFound();
                }
                return Ok(true);
            }
            return BadRequest();
        }

        [HttpPatch("/Unsubscribe/{userId}")]
        [Route("Unsubscribe/{userId}")]
        public async Task<ActionResult> Unsubscribe(int userId, Community community)
        {
            if (ModelState.IsValid)
            {
                var resultOK = await _db.Unsubscribe(userId, community);
                if (!resultOK)
                {
                    return NotFound();
                }
                return Ok(true);
            }
            return BadRequest();
        }

    } // End class
}
