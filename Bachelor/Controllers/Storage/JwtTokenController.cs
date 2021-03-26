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
        [HttpGet("/DecodeToken/{token}")]
        [Route("DecodeToken/{token}")]
        public ActionResult DecodeToken(string token)
        {
            JwtTokenRepository jwt = new JwtTokenRepository();
            var id = jwt.ReadTokenSubject(token);

            if(id == null)
            {
                return BadRequest("Token could not be read");
            }

            return Ok(id);
        }

    } // END CLASS
}
