using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Models
{
    public class Comment
    {
        public int Id { get; set; }

        virtual public Post Post { get; set; }

        public string Text { get; set; }

        public string UserID { get; set; }

        public string Date { get; set; }

        public int Upvotes { get; set; }

        public int Downvotes { get; set; }
    }
}
