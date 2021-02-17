using Bachelor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL
{
    public interface IJwtTokenRepository
    {
        public string GenerateToken(int userId);
        public bool ValidateCurrentToken(string token);
        public string ReadTokenSubject(string token);
    }
}

