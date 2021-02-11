﻿using Bachelor.Models.Communities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Bachelor.Models.Communities
{
    public class Post
    {
        [Key]
        public int Id { get; set; }

        [RegularExpression(@"[a-zA-ZæøåÆØÅ., \-\s\S]{20,1000}$")]
        public string Text { get; set; }

        public string UserID { get; set; }

        public virtual Community Community { get; set; }

        public string Date { get; set; }

        public int Upvotes { get; set; }

        public int Downvotes { get; set; }
        public virtual List<Comment> Comment { get; set; }

        public virtual PostTag PostTag { get; set; }
    }
}