using System;
using System.Collections.Generic;
using Bachelor.Models.Admin;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL.Admin.Settings
{
    public interface ISiteSettingRepository
    {
        Task<List<SiteSetting>> GetAll();

        Task<bool> Change(List<SiteSetting> settings);
    }
}
