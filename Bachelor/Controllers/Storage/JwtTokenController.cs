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
    public class JwtTokenController : ControllerBase
    {
        private readonly IJwtTokenRepository _jwt;

        public JwtTokenController(IJwtTokenRepository jwt) {
            _jwt = jwt;
        }

        [HttpGet("/DecodeToken/{token}")]
        [Route("DecodeToken/{token}")]
        public async Task<ActionResult> DecodeToken(string token)
        {
            var id = _jwt.ReadTokenSubject(token);

            if(id == null)
            {
                return BadRequest("Token could not be read");
            }

            return Ok(id);
        }

        [HttpGet("/ValidateToken/{token}")]
        [Route("ValidateToken/{token}")]
        public async Task<ActionResult> ValidateToken(string token) {
            var validated = _jwt.ValidateCurrentToken(token);

            if(!validated) {
                return BadRequest("Token was not valid");
            }
            return Ok(true);
        }

    } // END CLASS
}
