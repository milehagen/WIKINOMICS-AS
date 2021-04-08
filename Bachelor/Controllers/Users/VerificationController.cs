using Bachelor.DAL.Users;
using Bachelor.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Controllers.Users
{
    [ApiController]
    [Route("api/[controller]")]
    public class VerificationController : ControllerBase
    {
        private readonly IVerificationRepository _db;

        public VerificationController(IVerificationRepository db)
        {
            _db = db;
        }

        [HttpGet]
        [Route("CheckMail/{address}")]
        public async Task<ActionResult> CheckMail(string address)
        {
            bool ResultOk = await _db.CheckMail(address);
            if (!ResultOk)
            {
                return NotFound();
            }
            return Ok(true);
        }

        [HttpGet]
        [Route("SendVerification/{experienceID}/{address}")]
        public async Task<ActionResult> SendVerification(int experienceID, string address)
        {
            bool ResultOk = await _db.SendVerification(experienceID, address);
            if (!ResultOk)
            {
                return BadRequest();
            }
            return Ok(true);
        }

        [HttpPatch]
        [Route("Verify/{experienceID}")]
        public async Task<ActionResult> Verify(int experienceID)
        {
            bool ResultOk = await _db.Verify(experienceID);
            if (!ResultOk)
            {
                return BadRequest();
            }
            return Ok(true);
        }
    }
}
