using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Models.Communities
{
    public class PostTag
    {
        [Key]
        public int Id { get; set; }
        
        [RegularExpression(@"[a-zA-ZæøåÆØÅ., \-]{3,30}$")]
        public string Title { get; set; }
    }
}
