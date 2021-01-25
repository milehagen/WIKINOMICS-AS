using Bachelor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.DAL
{
    interface ICommunityRepositorycs
    {
        Task<List<Community>> GetAll();
    }
}
