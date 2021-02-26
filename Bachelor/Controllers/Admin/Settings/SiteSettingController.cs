using Bachelor.DAL.Admin.Settings;
using Bachelor.Models.Admin;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Controllers.Admin.Settings
{
    [ApiController]
    [Route("api/admin/[controller]")]
    public class SiteSettingController : ControllerBase
    {
        private readonly ISiteSettingRepository _db;

        public SiteSettingController(ISiteSettingRepository db)
        {
            _db = db;
        }

        [HttpGet("/GetAll")]
        [Route("GetAll")]
        public async Task<ActionResult> GetAll()
        {
            List<SiteSetting> allSettings = await _db.GetAll();
            return Ok(allSettings);
        }

        [HttpPost("/Change")]
        [Route("Change")]
        public async Task<ActionResult> Change(List<SiteSetting> settings)
        {
            if (ModelState.IsValid)
            {
                var returnOK = await _db.Change(settings);
                if (!returnOK)
                {
                    return NotFound("Setting was not found");
                }
                return Ok(true);
            }
            return BadRequest("Wrong input validation");
        }
    }
}
