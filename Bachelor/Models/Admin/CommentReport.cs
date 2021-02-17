using Bachelor.Models.Communities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Models.Admin
{
    public class CommentReport
    {
        public int Id { get; set; }

        public virtual Comment Comment { get; set; }

        public string LastReportDate { get; set; }

        public int NumberOfReports { get; set; }

    }
}
