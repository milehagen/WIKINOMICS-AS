using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Models
{
    public class Industry
    {
        [Key]
        public int IndustryId { get; set; }

        [RegularExpression(@"[a-zA-ZæøåÆØÅ., \-]{2,60}$")]
        public string Title { get; set; }
    }
}
