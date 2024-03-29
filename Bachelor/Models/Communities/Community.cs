﻿using System;
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

        [RegularExpression(@"[a-zA-ZæøåÆØÅ., \-]{2,100}$")]
        public string Title { get; set; }

        public string Description { get; set; }

        //TODO: Replace with a Community object, as a Parent reference
        public int Level { get; set; }

        public virtual List<Community> Communities { get; set; }

    }

}
