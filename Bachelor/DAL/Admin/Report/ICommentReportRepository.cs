using Bachelor.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Admin.Report
{
    public interface ICommentReportRepository
    {
        Task<List<CommentReport>> GetAll();

        Task<bool> Delete(int reportId);
    }
}
