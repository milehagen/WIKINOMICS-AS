using Bachelor.DAL;
using Bachelor.DAL.Storage;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Controllers.Storage
{
    [Route("api/[controller]")]
    [ApiController]
    public class CookieController : ControllerBase
    {
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
                Expires = DateTimeOffset.UtcNow.AddMinutes(10)
            });
            return Ok();
        }

        //Takes in the cookiename that you want the value of
        [HttpGet("/GetCookieContent/{cookieName}")]
        [Route("GetCookieContent/{cookieName}")]
        public async Task<ActionResult> GetCookieContent(string cookieName)
        {
            try
            {
                var value = "";

                // Check if the cookie exists, if it doesn't, return
                // If it exists, get the value
                if (Request.Cookies[cookieName] == null)
                {
                    return BadRequest("Cookie does not exist");
                }
                value = Request.Cookies[cookieName];

                //Send the content to decode it

                // This should it's own method as this method only should return the cookievalue
                JwtTokenRepository jwt = new JwtTokenRepository();
                string id = jwt.ReadTokenSubject(value);

                //return the user ID
                return Ok(id);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("/CreateLoggedInCookie")]
        [Route("CreateLoggedInCookie")]
        public async Task<ActionResult> CreateLoggedInCookie()
        {
            CookieRepository cookie = new CookieRepository();
            if(cookie.CreateLoggedInCookie(HttpContext))
            {
                return Ok();
            } else
            {
                return BadRequest();
            }
            
        }

    } // END CLASS
}
