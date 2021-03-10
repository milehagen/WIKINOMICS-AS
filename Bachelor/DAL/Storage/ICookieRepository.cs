using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Storage
{
    interface ICookieRepository
    {
        bool CreateLoggedInCookie(HttpContext context, string value);

        string GetCookieContent(HttpContext context, string cookieName);
    }
}
