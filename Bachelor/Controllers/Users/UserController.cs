﻿using System;
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
                    return BadRequest("Kunne ikke lagre bruker i DB");
                }
                return Ok("Ja");
            }
            Console.WriteLine("Model state er ikke valid");
            return BadRequest("Feil ved input");
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
        public ActionResult GetToken(string userEmail)
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
                    return NotFound("Kunne ikke lagre i db");
                }
                return Ok(true);
            }
            return BadRequest("Model state er ikke valid");
        }

        [HttpPost("/AddExperience")]
        [Route("AddExperience")]
        public async Task<ActionResult> AddExperience(Experience exp) {
            Console.WriteLine("Lagrer exp");
            if(ModelState.IsValid) {
                var resultOk = await _db.AddExperience(exp);
                if(!resultOk) {
                    return BadRequest("Kunne ikke lagre i DB");
                }
                return Ok("Erfaring lagret");
            }
            return BadRequest("Model state er ikke valid");
        }

    } // End class
}
