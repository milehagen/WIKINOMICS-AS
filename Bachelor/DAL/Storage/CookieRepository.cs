using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Storage
{
    public class CookieRepository : ICookieRepository
    {
        public bool CreateLoggedInCookie(HttpContext context)
        {
            try
            {
                context.Response.Cookies.Append("LoggedIn", "1", new CookieOptions
                {
                    Expires = DateTimeOffset.UtcNow.AddMinutes(30),
                    Secure = true,
                    HttpOnly = true
                });
            } catch
            {
                return false;
            }
            return true;
        }
    }
}
