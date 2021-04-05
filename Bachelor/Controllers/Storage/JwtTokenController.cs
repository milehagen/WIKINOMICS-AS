using Bachelor.DAL;
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
        JwtTokenRepository jwt = new JwtTokenRepository();
        [HttpGet("/DecodeToken/{token}")]
        [Route("DecodeToken/{token}")]
        public ActionResult DecodeToken(string token)
        {
            var id = jwt.ReadTokenSubject(token);

            if(id == null)
            {
                return BadRequest("Token could not be read");
            }

            return Ok(id);
        }

        [HttpGet("/ValidateToken/{token}")]
        [Route("ValidateToken/{token}")]
        public ActionResult ValidateToken(string token) {
            var validated = jwt.ValidateCurrentToken(token);

            if(!validated) {
                return BadRequest("Token was not valid");
            }
            return Ok(true);
        }

    } // END CLASS
}
