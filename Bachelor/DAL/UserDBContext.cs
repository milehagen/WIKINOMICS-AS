using System;
using Microsoft.EntityFrameworkCore;
using Bachelor.Models;

namespace Bachelor.DAL
{
    public class UserDBContext : DbContext
    {
        public UserDBContext(DbContextOptions<UserDBContext> options) : base(options)
        {
            Database.EnsureCreatedAsync();
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Community> Communities { get; set; }
    }
}
