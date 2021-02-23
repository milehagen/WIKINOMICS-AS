using Bachelor.Models.Admin;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Admin.Report
{
    public class PostReportRepository : IPostReportRepository
    {

        private readonly UserDBContext _db;

        public PostReportRepository(UserDBContext db)
        {
            _db = db;
        }

        public async Task<List<PostReport>> GetAll()
        {
            try
            {
                List<PostReport> allReports = await _db.PostReports.ToListAsync();
                return allReports;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> Delete(int reportId)
        {
            try
            {
                var reportToDelete = await _db.CommentReports.FindAsync(reportId);
                if (reportToDelete != null)
                {
                    _db.CommentReports.Remove(reportToDelete);
                    await _db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }
    }
}
