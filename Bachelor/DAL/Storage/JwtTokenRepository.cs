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
using Microsoft.AspNetCore.Http;
using System.Net.Http;
using Microsoft.Extensions.Primitives;

namespace Bachelor.DAL.Storage
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
                Expires = DateTime.UtcNow.AddDays(365),
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
                return true;
            } catch(Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }

        //Takes in a JWT and returns the ID
        public string ReadTokenSubject(string token)
        {
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadJwtToken(token);
                var id = jsonToken.Claims.First(claim => claim.Type == "ID").Value;
                return id.ToString();
            } catch
            {
                return null;
            }
        }

        public bool Validate(HttpContext http) {
            StringValues headerValues;
            string token = "";
            char[] charsToTrim = {'"'};
            
            try {
            // Get the token and trim it to satisfy standards
            if(http.Request.Headers.TryGetValue("Authorization", out headerValues)) {
                token = headerValues.FirstOrDefault();
            }
            token = token.Trim(charsToTrim);

            //Validate it coming from us
            var valid = this.ValidateCurrentToken(token);
            if(!valid) {
                return false;
            }
            return true;
            } catch(Exception e) {
                Console.WriteLine(e);
                return false;
            }
        }

// Validates the token and the user
        public bool ValidateWithAccess(HttpContext http, int userid) {
            var valid = this.Validate(http);
            StringValues headerValues;
            string token = "";
            char[] charsToTrim = {'"'};

            try{
                if(!valid) {
                    return false;
                }

            // Get the token and trim it to satisfy standards
            if(http.Request.Headers.TryGetValue("authorization", out headerValues)) {
                    token = headerValues.FirstOrDefault();
            }
            token = token.Trim(charsToTrim);

            var id = Int32.Parse(this.ReadTokenSubject(token));
            if(id != userid) {
                return false;
            }
            return true;
            } catch(Exception e) {
                Console.WriteLine(e);
                return false;
            }
        }
    }// End of class
}

