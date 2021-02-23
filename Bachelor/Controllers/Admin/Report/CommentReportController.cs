using Bachelor.DAL.Admin.Report;
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
    public class CommentReportController : ControllerBase
    {
        private readonly ICommentReportRepository _db;

        public CommentReportController(ICommentReportRepository db)
        {
            _db = db;
        }

        [HttpGet("/GetAll")]
        [Route("GetAll")]
        public async Task<ActionResult> GetAll()
        {
            List<CommentReport> allReports = await _db.GetAll();
            return Ok(allReports);
        }

        [HttpDelete("/Delete/{reportId}")]
        [Route("Delete/{reportId}")]
        public async Task<ActionResult> Delete(int reportId)
        {
            var resultOK = await _db.Delete(reportId);
            if (!resultOK)
            {
                return NotFound("Report could not be found");
            }
            return Ok("Report was deleted");
        }
    }
}
