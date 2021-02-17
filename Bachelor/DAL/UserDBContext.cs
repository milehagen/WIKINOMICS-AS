using System;
using Microsoft.EntityFrameworkCore;
using Bachelor.Models;
using Bachelor.Models.Communities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Bachelor.Models.Admin;

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

        public DbSet<Post> Posts { get; set; }

        public DbSet<UserPostVote> UserPostVotes { get; set; }

        public DbSet<PostReport> PostReports { get; set; }

        public DbSet<PostTag> PostTags { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<UserCommentVote> UserCommentVotes { get; set; }

        public DbSet<CommentReport> CommentReports { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

    }
}
