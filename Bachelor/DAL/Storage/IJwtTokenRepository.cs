using Bachelor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;

namespace Bachelor.DAL
{
    public interface IJwtTokenRepository
    {
        public string GenerateToken(int userId);
        public bool ValidateCurrentToken(string token);
        public string ReadTokenSubject(string token);

        public bool Validate(HttpContext http);

        public bool ValidateWithAccess(HttpContext http, int userid);
    }
}

