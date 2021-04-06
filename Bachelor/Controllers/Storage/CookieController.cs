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
        public ActionResult CreateAnonymousCookie()
        {
            Console.WriteLine("Start cookie");
            var cookiename = "guest";
            HttpContext.Response.Cookies.Append(cookiename, "", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                Expires = DateTimeOffset.UtcNow.AddMinutes(10)
            });
            return Ok(true);
        }

        //Takes in the cookiename that you want the value of
        [HttpGet("/GetCookieContent/{cookieName}")]
        [Route("GetCookieContent/{cookieName}")]
        public ActionResult GetCookieContent(string cookieName)
        {
            try
            {
                CookieRepository cookie = new CookieRepository();
                var value = cookie.GetCookieContent(HttpContext, cookieName);
                if(value == null)
                {
                    return BadRequest("Cookie does not exist");
                }
                return Ok(value);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("/CreateLoggedInCookie/{value}")]
        [Route("CreateLoggedInCookie/{value}")]
        public ActionResult CreateLoggedInCookie(string value)
        {
            CookieRepository cookie = new CookieRepository();
            if(cookie.CreateLoggedInCookie(HttpContext,value))
            {
                return Ok(true);
            } else
            {
                return BadRequest(false);
            }
            
        }
    } // END CLASS
}
