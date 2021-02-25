using Bachelor.Models.Admin;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Admin.Report
{
    public class CommentReportRepository : ICommentReportRepository
    {
        private readonly UserDBContext _db;

        public CommentReportRepository(UserDBContext db)
        {
            _db = db;
        }

        public async Task<List<CommentReport>> GetAll()
        {
            try
            {
                List<CommentReport> allReports = await _db.CommentReports.ToListAsync();
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
