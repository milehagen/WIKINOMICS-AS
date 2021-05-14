using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bachelor.DAL;
using Bachelor.DAL.Users;
using Bachelor.DAL.Storage;
using Bachelor.Models;
using Bachelor.Models.Communities;
using Castle.Core.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Bachelor.Controllers.Users
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _db;
        private readonly IJwtTokenRepository _jwt;

        public UserController(IUserRepository db, IJwtTokenRepository jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        [HttpGet("/GetUserInit")]
        [Route("GetUserInit")]
        public async Task<ActionResult> GetUserInit() {
            CookieRepository cookie = new CookieRepository();
            try{
                var cookieContent = cookie.GetCookieContent(HttpContext, "userid");
                var useridString = _jwt.ReadTokenSubject(cookieContent);
                int userid = Int32.Parse(useridString);
                User user = await _db.GetUser(userid);

                if(user != null) {
                    return Ok(user);
                }
                return NotFound();

            } catch (Exception e) {
                Console.WriteLine(e);
                return NotFound();
            }
        }

        [HttpGet("/GetUser/{userID}")]
        [Route("GetUser/{userID}")]
        public async Task<ActionResult> GetUser(int userID)
        {
            try {
                bool access = _jwt.ValidateWithAccess(HttpContext, userID);
                if(!access) {
                    return Unauthorized(false);
                }
            } catch(Exception e) {
                Console.WriteLine(e);
                return BadRequest(false);
            }

            User foundUser = await _db.GetUser(userID);
                if(foundUser != null) {
                    return Ok(foundUser);
                }
                return NotFound(false);
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
                    return BadRequest("Couldn't add user");
                }
                return Ok(true);
            }
            return BadRequest(ModelState);
        }

        [HttpPost]
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
            return BadRequest(ModelState);
        }

        // Takes in email, find the user id and generates a token a creates a cookie
        [HttpGet("/GetToken/{userEmail}")]
        [Route("GetToken/{userEmail}")]
        public async Task<ActionResult> GetToken(string userEmail)
        {
            try{
            int id = await _db.FindId(userEmail);
            string token = _jwt.GenerateToken(id);
            

            // Lasting for 10 years
            string cookiename = "userid";
            HttpContext.Response.Cookies.Append(cookiename, token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                MaxAge = TimeSpan.FromDays(3650),
                SameSite = SameSiteMode.Strict
            });
            return Ok(token);
            } catch (Exception e) {
                Console.WriteLine(e);
                return BadRequest(false);
            }
        }

        [HttpGet("/GetAllIndustries")]
        [Route("GetAllIndustries")]
        public async Task<ActionResult> GetAllIndustries()
        {
            List<Industry> industries = await _db.GetAllIndustries();
            if(industries.IsNullOrEmpty())
            {
                return NotFound("No industries found");
            }

            return Ok(industries);
        }

        [HttpGet("/GetAllStudentSubjects")]
        [Route("GetAllStudentSubjects")]
        public async Task<ActionResult> GetAllStudentSubjects()
        {
            List<studentSubject> studentSubjects = await _db.GetAllStudentSubjects();

            if(studentSubjects.IsNullOrEmpty())
            {
                return NotFound("No subjects found");
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
                    return NotFound(false);
                }
                return Ok(true);
            }
            return BadRequest(ModelState);
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
                    return NotFound(false);
                }
                return Ok(true);
            }
            return BadRequest(ModelState);
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
            return BadRequest(ModelState);
        }

        [HttpPost("/AddExperience/{userId}")]
        [Route("AddExperience/{userId}")]
        public async Task<ActionResult> AddExperience(Experience exp, int userId ) {
            if(ModelState.IsValid) {
                var resultOk = await _db.AddExperience(exp, userId);
                if(!resultOk) {
                    return NotFound(false);
                }
                return Ok(true);
            }
            return BadRequest(ModelState);
        }

        //Gets all the experiences for a user
        [HttpGet("/GetExperiences/{user}")]
        [Route("GetExperiences/{user}")]
        public async Task<ActionResult> GetExperiences(User user) {
            List<Experience> expList = await _db.GetExperiences(user);

            if(expList.IsNullOrEmpty()) {
                return NotFound("No experiences found for user");
            }

            return Ok(expList);
        }

        //Gets a single experience
        [HttpGet("/GetExperience/{experienceId}")]
        [Route("GetExperience/{experienceId}")]
        public async Task<ActionResult> GetExperience(int experienceId) {
            Experience experience = await _db.GetExperience(experienceId);
            try {
                var accessGranted = _jwt.ValidateWithAccess(HttpContext, experience.user.Id);
                if(!accessGranted) {
                    Console.WriteLine("Unauthorized");
                    return Unauthorized(false);
                }
            } catch(Exception e) {
                Console.WriteLine(e);
                return BadRequest("Kunne ikke hente experience");
            }

            if(experience != null) {
                return Ok(experience);
            }
            return BadRequest(false);
            
        }

        [HttpPatch("/patchExperience")]
        [Route("patchExperience")]
        public async Task<ActionResult> patchExperience(Experience experience) {
            try{
                bool access = _jwt.ValidateWithAccess(HttpContext, experience.user.Id);
                if(!access) {
                    Console.WriteLine("No access");
                    return Unauthorized(false);
                }
            }catch(Exception e) {
                Console.WriteLine(e);
                return BadRequest(false);
            }

            if(ModelState.IsValid) {
                bool resultOk = await _db.patchExperience(experience);
                if(resultOk) {
                    Console.WriteLine("Resource patched");
                    return Ok(true);
                }
                return BadRequest(false);
            }
            return BadRequest(ModelState);
        }

    } // End class
}
