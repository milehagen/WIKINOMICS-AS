using Bachelor.Models.Admin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Admin
{
    public interface IPostReportRepository
    {
        Task<List<PostReport>> GetAll();

        Task<bool> Delete(int reportId);
    }
}
