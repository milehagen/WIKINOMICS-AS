using Bachelor.Models.Communities;
using System;
using System.Collections.Generic;

namespace Bachelor.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }

        //public virtual Experience experience { get; set; }

        public virtual ICollection<Experience> experience { get; set; }
        public virtual List<Community> Communities { get; set; }
        public string Role { get; set; }
    }
}
