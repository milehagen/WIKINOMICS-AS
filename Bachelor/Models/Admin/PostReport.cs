using Bachelor.Models.Communities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Models.Admin
{
    public class PostReport
    {
        [Key]
        public int Id { get; set; }

        public virtual Post Post { get; set; }

        public string LastReportDate { get; set; }

        public int NumberOfReports { get; set; }
    }
}
