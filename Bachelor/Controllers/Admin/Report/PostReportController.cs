using Bachelor.DAL.Admin;
using Bachelor.Models.Admin;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Controllers.Admin.Report
{
    [ApiController]
    [Route("api/admin/reports/[controller]")]
    public class PostReportController : ControllerBase
    {
        private readonly IPostReportRepository _db;

        public PostReportController(IPostReportRepository db)
        {
            _db = db;
        }

        [HttpGet("/GetAll")]
        [Route("GetAll")]
        public async Task<ActionResult> GetAll()
        {
            List<PostReport> allReports = await _db.GetAll();
            return Ok(allReports);
        }

        [HttpDelete("/Delete/{reportId}")]
        [Route("Delete/{reportId}")]
        public async Task<ActionResult> Delete(int reportId)
        {
            System.Diagnostics.Debug.WriteLine(reportId);
            var resultOK = await _db.Delete(reportId);
            if (!resultOK)
            {
                return Ok(false);
            }
            return Ok(true);
        }

    }
}
