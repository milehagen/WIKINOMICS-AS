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

    /*These are questions we ask the user after signing up
    * 1. This will represent a question of what kind of role the user had
    * with their experience
    * 2. This will represent the best part with their experience
    * 3. This will represent the most challening feature of their experience
    * 4. This will represent what advice they would wish that someone
    * told them before they started their experience
    */


    public string questionRole { get; set; }

    public string questionBest { get; set;}

    public string questionChallenging { get; set; }

    public string questionAdvice { get; set; }

    public virtual User user { get; set; }

    public bool Verified { get; set; }
    }
}

