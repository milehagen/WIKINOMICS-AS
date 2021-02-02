using System;
using Microsoft.EntityFrameworkCore;
using Bachelor.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Bachelor.DAL
{

    public class Posts
    {
        [Key]
        public int Id { get; set; }

        public string Text { get; set; }

        public string UserID { get; set; }

        public virtual Community Community { get; set; }

        public DateTime Date { get; set; }

        public int Upvotes { get; set; }

        public int Downvotes { get; set; }
        public virtual List<Comments> Comment { get; set; }
    }

    public class Comments
    {
        [Key]
        public int Id { get; set; }

        virtual public Posts Post { get; set; }

        public string Text { get; set; }

        public string UserID { get; set; }

        public DateTime Date { get; set; }

        public int Upvotes { get; set; }

        public int Downvotes { get; set; }
    }

    public class UserDBContext : DbContext
    {
        public UserDBContext(DbContextOptions<UserDBContext> options) : base(options)
        {
            Database.EnsureCreatedAsync();
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Community> Communities { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Comment> Comments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

    }
}
