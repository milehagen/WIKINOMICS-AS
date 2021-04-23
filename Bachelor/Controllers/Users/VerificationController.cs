using Bachelor.DAL.Users;
using Bachelor.Models;
using Bachelor.Models.Users;
using Castle.Core.Internal;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
        [Route("GetVerified")]
        public async Task<ActionResult> GetVerified()
        {
            List<Domain> domains = await _db.GetVerified();
            return Ok(domains);
        }

        [HttpGet]
        [Route("GetUnverified")]
        public async Task<ActionResult> GetUnverified()
        {
            List<Domain> domains = await _db.GetUnverified();
            return Ok(domains);
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

        [HttpPost]
        [Route("AddToReview")]
        public async Task<ActionResult> AddToReview(Domain domain)
        {
            bool ResultOk = await _db.AddToReview(domain);
            if (!ResultOk)
            {
                return BadRequest();
            }
            return Ok(true);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<ActionResult> Add(Domain domain)
        {
            bool ResultOk = await _db.Add(domain);
            if (!ResultOk)
            {
                return BadRequest();
            }
            return Ok(true);
        }

        [HttpDelete]
        [Route("Delete/{domain}")]
        public async Task<ActionResult> Delete(string domain)
        {
            bool ResultOk = await _db.Delete(domain);
            if (!ResultOk)
            {
                return NotFound();
            }
            return Ok(true);
        }
    }
}
