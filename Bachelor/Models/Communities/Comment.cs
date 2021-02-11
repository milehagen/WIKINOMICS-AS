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

        public string UserID { get; set; }

        public string Date { get; set; }

        [RegularExpression(@"[0-9]{1,10}")]
        public int Upvotes { get; set; }

        [RegularExpression(@"[0-9]{1,10}")]
        public int Downvotes { get; set; }
    }
}
