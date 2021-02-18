using Bachelor.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Bachelor.DAL
{
    public class JwtTokenRepository : IJwtTokenRepository
    {
        public JwtTokenRepository()
        {

        }

        public string GenerateToken(int userId)
        {
            var secret = "dfgDEY345778!!%%%fsdjhflksd";
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
            var issuer = "KnowOne";
            var audience = "authentificationCode";
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("ID", userId.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public bool ValidateCurrentToken(string token)
        {

            var secret = "dfgDEY345778!!%%%fsdjhflksd";
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret));
            var issuer = "KnowOne";
            var audience = "authentificationCode";
            

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = securityKey
                }, out SecurityToken validatedToken);
            } catch
            {
                return false;
            }
            return true;
        }

        //NOT TESTED
        //Takes in a JWT and returns the subject
        public string ReadTokenSubject(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var JsonToken = handler.ReadJwtToken(token);

            return JsonToken.Subject.ToString();
        }
    }// End of class
}

