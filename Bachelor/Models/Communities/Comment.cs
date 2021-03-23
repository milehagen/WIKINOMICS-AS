using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Models.Communities
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }

        virtual public Post Post { get; set; }

        [RegularExpression(@"[a-zA-ZæøåÆØÅ., \-\s\S]{10,500}$")]
        public string Text { get; set; }

        public virtual User User { get; set; }

        public string Date { get; set; }

        [RegularExpression(@"^-?\d+$")]
        public int Upvotes { get; set; }

        [RegularExpression(@"^-?\d+$")]
        public int Downvotes { get; set; }

        public int ResponsTo { get; set; }

        public bool Anonymous { get; set; }
    }
}
