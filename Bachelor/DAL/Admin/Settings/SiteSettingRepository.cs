using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bachelor.Models.Admin;
using Microsoft.EntityFrameworkCore;

namespace Bachelor.DAL.Admin.Settings
{
    public class SiteSettingRepository : ISiteSettingRepository
    {
        private readonly UserDBContext _db;

        public SiteSettingRepository(UserDBContext db)
        {
            _db = db;
        }

        public async Task<List<SiteSetting>> GetAll()
        {
            try
            {
                List<SiteSetting> allSettings = await _db.SiteSettings.ToListAsync();
                return allSettings;
            }
            catch
            {
                return null;
            }

        }

        public async Task<bool> Change(List<SiteSetting> settings)
        {
            try
            {
                foreach(SiteSetting setting in settings)
                {
                    var foundSetting = await _db.SiteSettings.FirstOrDefaultAsync(s => s.Id == setting.Id);
                    foundSetting.SettingValue = setting.SettingValue;
                    await _db.SaveChangesAsync();
                }
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
