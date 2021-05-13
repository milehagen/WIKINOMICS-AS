using Bachelor.Models.Communities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Models.Notification
{
    public class Notification
    {
        [Key]
        public int Id { get; set; }

        public virtual User User { get; set; }

        public virtual Post Post { get; set; }

        public bool Notify { get; set; }

        public bool Viewed { get; set; }

        public string LastNotification { get; set; }
    }
}
