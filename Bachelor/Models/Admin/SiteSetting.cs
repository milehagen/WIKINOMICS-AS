using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Models.Admin
{
    public class SiteSetting
    {
        [Key]
        public int Id { get; set; }

        public string SettingName { get; set; }

        public string SettingValue { get; set; }

        public string Description { get; set; }
    }
}
