using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bachelor.DAL;
using Bachelor.Models;
using Bachelor.Models.Communities;
using Castle.Core.Internal;
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
            if (ModelState.IsValid)
            {
                Console.WriteLine("model state er valid");
                bool returOK = await _db.AddUser(user);
                if(!returOK)
                {
                    Console.WriteLine("Kunne ikke adde bruker i db");
                    return BadRequest(false);
                }
                return Ok(true);
            }
            Console.WriteLine("Model state er ikke valid");
            return BadRequest(false);
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
                    return NotFound(false);
                }
                return Ok(true);
            }
            return BadRequest(false);
        }

        // Takes in email, find the user id and generates a token a creates a cookie
        [HttpGet("/GetToken/{userEmail}")]
        [Route("GetToken/{userEmail}")]
        public ActionResult GetToken(string userEmail)
        {
            try{
            JwtTokenRepository jwt = new JwtTokenRepository();
            int id = _db.FindId(userEmail);
            string token = jwt.GenerateToken(id);
            

            // Lasting for 10 years
            string cookiename = "userid";
            HttpContext.Response.Cookies.Append(cookiename, token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                MaxAge = TimeSpan.FromDays(3650),
                SameSite = SameSiteMode.Strict
            });
            return Ok(true);
            } catch (Exception e) {
                Console.WriteLine(e);
                return BadRequest(false);
            }
        }

        [HttpGet("/GetAllIndustries")]
        [Route("GetAllIndustries")]
        public async Task<ActionResult> GetAllIndustries()
        {
            List<Industry> occupations = await _db.GetAllIndustries();
            if(occupations.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(occupations);
        }

        [HttpGet("/GetAllStudentSubjects")]
        [Route("GetAllStudentSubjects")]
        public async Task<ActionResult> GetAllStudentSubjects()
        {
            List<studentSubject> studentSubjects = await _db.GetAllStudentSubjects();

            if(studentSubjects.IsNullOrEmpty())
            {
                return NotFound();
            }

            return Ok(studentSubjects);
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

        [HttpPost("/PostExpInfo")]
        [Route("PostExpInfo")]
        public async Task<ActionResult> PostExpinfo(Experience exp) {
            if(ModelState.IsValid) {
                var resultOk = await _db.PostExpInfo(exp);
                if(!resultOk) {
                    return NotFound(false);
                }
                return Ok(true);
            }
            return BadRequest(false);
        }

        [HttpPost("/AddExperience/{userId}")]
        [Route("AddExperience/{userId}")]
        public async Task<ActionResult> AddExperience(Experience exp, int userId ) {
            if(ModelState.IsValid) {
                var resultOk = await _db.AddExperience(exp, userId);
                if(!resultOk) {
                    return BadRequest(false);
                }
                return Ok(true);
            }
            return BadRequest(false);
        }

        //Gets all the experiences for a user
        [HttpGet("/GetExperiences/{user}")]
        [Route("GetExperiences/{user}")]
        public async Task<ActionResult> GetExperiences(User user) {
            List<Experience> expList = await _db.GetExperiences(user);

            if(expList.IsNullOrEmpty()) {
                return NotFound();
            }

            return Ok(expList);
        }

        //Gets a single experience
        [HttpGet("/GetExperience/{experienceId}")]
        [Route("GetExperience/{experienceId}")]
        public async Task<ActionResult> GetExperience(int experienceId) {
            Experience experience = await _db.GetExperience(experienceId);

            if(experience != null) {
                return Ok(experience);
            }
            return null;
        }

    } // End class
}
