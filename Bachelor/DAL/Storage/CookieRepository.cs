using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Storage
{
    public class CookieRepository : ICookieRepository
    {
        public bool CreateLoggedInCookie(HttpContext context, string value)
        {
            try
            {
                context.Response.Cookies.Append("LoggedIn", value, new CookieOptions
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

        public string GetCookieContent(HttpContext context, string cookieName)
        {
            var value = "";

            if(context.Request.Cookies[cookieName] == null)
            {
                return null;
            }
            value = context.Request.Cookies[cookieName];
            return value;
        }

    } // END CLASS
}
