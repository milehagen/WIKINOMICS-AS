﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Models.Communities
{
    public class UserCommentVote
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public int CommentId { get; set; }

        [RegularExpression(@"^-?\d+$")]
        public int Voted { get; set; }
    }
}
