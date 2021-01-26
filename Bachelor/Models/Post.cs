using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Models
{
    public class Post
    {
        public int Id { get; set; }

        public string Text { get; set; }

        public string UserID { get; set; }

        virtual public Community Community { get; set; }

        public DateTime Date { get; set; }

        public int Upvotes { get; set; }

        public int Downvotes { get; set; }
    }
}
