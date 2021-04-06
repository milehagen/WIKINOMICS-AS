using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Models.Communities
{
    public class Community
    {
        [Key]
        public int Id { get; set; }

        [RegularExpression(@"[a-zA-ZæøåÆØÅ., \-]{3,40}$")]
        public string Title { get; set; }

        public string Description { get; set; }

        public virtual Community Communities { get; set; }
    }
}
