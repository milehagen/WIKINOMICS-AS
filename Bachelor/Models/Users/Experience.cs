using Bachelor.Models.Communities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Bachelor.Models {
    public class Experience {
    [Key]
    public int Id { get; set; }

    public string occupation { get; set; }

    public virtual Industry Industry { get; set; }

    public virtual studentSubject StudentSubject { get; set; }

    public DateTime startDate { get; set; }

    public DateTime endDate { get; set; }

    public int userid { get; set; }
    public virtual User user { get; set; }
    }
}

