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
            //Database.EnsureCreatedAsync();
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

        public DbSet<SiteSetting> SiteSettings { get; set; }

        public DbSet<Industry> Industries { get; set; }

        public DbSet<studentSubject> Subjects { get; set; }

        public DbSet<Experience> Experiences { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer(@"Data Source=SHAKUS-DESKTOP;Initial Catalog=Userdb;Integrated Security=True");
            optionsBuilder.UseLazyLoadingProxies();
        }

        //Making sure entitis with relationship to deleted items are also deleted
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //If a post is deleted the comments made should also be deleted
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Comment)
                .WithOne(c => c.Post)
                .OnDelete(DeleteBehavior.ClientCascade);
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Comment)
                .WithOne(c => c.Post)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.experience)
                .WithOne(e => e.user)
                .OnDelete(DeleteBehavior.SetNull);

            //If a comment is deleted the entity should be set to null in posts comments
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Post)
                .WithMany(p => p.Comment)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
