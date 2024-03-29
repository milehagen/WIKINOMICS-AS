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

    public Nullable <DateTime> startDate { get; set; }

    public Nullable <DateTime> endDate { get; set; }

    public string business { get; set; }

    public string questionRole { get; set; }

    public string questionBest { get; set;}

    public string questionChallenging { get; set; }

    public string questionAdvice { get; set; }

    public virtual User user { get; set; }

    public bool Verified { get; set; }
    }
}

