﻿// <auto-generated />
using System;
using Bachelor.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Bachelor.Migrations
{
    [DbContext(typeof(UserDBContext))]
    [Migration("20210505140049_MigrationCheck")]
    partial class MigrationCheck
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.4")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Bachelor.Models.Admin.CommentReport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CommentId")
                        .HasColumnType("int");

                    b.Property<string>("LastReportDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfReports")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CommentId");

                    b.ToTable("CommentReports");
                });

            modelBuilder.Entity("Bachelor.Models.Admin.PostReport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LastReportDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfReports")
                        .HasColumnType("int");

                    b.Property<int?>("PostId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.ToTable("PostReports");
                });

            modelBuilder.Entity("Bachelor.Models.Admin.SiteSetting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SettingName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SettingValue")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("SiteSettings");
                });

            modelBuilder.Entity("Bachelor.Models.Communities.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Anonymous")
                        .HasColumnType("bit");

                    b.Property<string>("Date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Downvotes")
                        .HasColumnType("int");

                    b.Property<int?>("ExperienceId")
                        .HasColumnType("int");

                    b.Property<int?>("PostId")
                        .HasColumnType("int");

                    b.Property<int?>("ResponsToId")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Upvotes")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ExperienceId");

                    b.HasIndex("PostId");

                    b.HasIndex("ResponsToId");

                    b.HasIndex("UserId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("Bachelor.Models.Communities.Community", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CommunityId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Level")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CommunityId");

                    b.HasIndex("UserId");

                    b.ToTable("Communities");
                });

            modelBuilder.Entity("Bachelor.Models.Communities.Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Anonymous")
                        .HasColumnType("bit");

                    b.Property<int?>("CommunityId")
                        .HasColumnType("int");

                    b.Property<string>("Date")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Downvotes")
                        .HasColumnType("int");

                    b.Property<int?>("ExperienceId")
                        .HasColumnType("int");

                    b.Property<int?>("PostTagId")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Upvotes")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CommunityId");

                    b.HasIndex("ExperienceId");

                    b.HasIndex("PostTagId");

                    b.HasIndex("UserId");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("Bachelor.Models.Communities.PostTag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("PostTags");
                });

            modelBuilder.Entity("Bachelor.Models.Communities.UserCommentVote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CommentId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("Voted")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("UserCommentVotes");
                });

            modelBuilder.Entity("Bachelor.Models.Communities.UserPostVote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("PostId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("Voted")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("UserPostVotes");
                });

            modelBuilder.Entity("Bachelor.Models.Experience", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("IndustryId")
                        .HasColumnType("int");

                    b.Property<int?>("StudentSubjectId")
                        .HasColumnType("int");

                    b.Property<bool>("Verified")
                        .HasColumnType("bit");

                    b.Property<string>("business")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("endDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("occupation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("questionAdvice")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("questionBest")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("questionChallenging")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("questionRole")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("startDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("userId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IndustryId");

                    b.HasIndex("StudentSubjectId");

                    b.HasIndex("userId");

                    b.ToTable("Experiences");
                });

            modelBuilder.Entity("Bachelor.Models.Industry", b =>
                {
                    b.Property<int>("IndustryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IndustryId");

                    b.ToTable("Industries");
                });

            modelBuilder.Entity("Bachelor.Models.Notification.Notification", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LastNotification")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Notify")
                        .HasColumnType("bit");

                    b.Property<int?>("PostId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.HasIndex("UserId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("Bachelor.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Age")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Firstname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Lastname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Bachelor.Models.Users.Domain", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Verified")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Domains");
                });

            modelBuilder.Entity("Bachelor.Models.studentSubject", b =>
                {
                    b.Property<int>("StudentSubjectId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("StudentSubjectId");

                    b.ToTable("Subjects");
                });

            modelBuilder.Entity("Bachelor.Models.Admin.CommentReport", b =>
                {
                    b.HasOne("Bachelor.Models.Communities.Comment", "Comment")
                        .WithMany()
                        .HasForeignKey("CommentId");

                    b.Navigation("Comment");
                });

            modelBuilder.Entity("Bachelor.Models.Admin.PostReport", b =>
                {
                    b.HasOne("Bachelor.Models.Communities.Post", "Post")
                        .WithMany()
                        .HasForeignKey("PostId");

                    b.Navigation("Post");
                });

            modelBuilder.Entity("Bachelor.Models.Communities.Comment", b =>
                {
                    b.HasOne("Bachelor.Models.Experience", "Experience")
                        .WithMany()
                        .HasForeignKey("ExperienceId");

                    b.HasOne("Bachelor.Models.Communities.Post", "Post")
                        .WithMany("Comment")
                        .HasForeignKey("PostId");

                    b.HasOne("Bachelor.Models.Communities.Comment", "ResponsTo")
                        .WithMany()
                        .HasForeignKey("ResponsToId");

                    b.HasOne("Bachelor.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Experience");

                    b.Navigation("Post");

                    b.Navigation("ResponsTo");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Bachelor.Models.Communities.Community", b =>
                {
                    b.HasOne("Bachelor.Models.Communities.Community", null)
                        .WithMany("Communities")
                        .HasForeignKey("CommunityId");

                    b.HasOne("Bachelor.Models.User", null)
                        .WithMany("Communities")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("Bachelor.Models.Communities.Post", b =>
                {
                    b.HasOne("Bachelor.Models.Communities.Community", "Community")
                        .WithMany()
                        .HasForeignKey("CommunityId");

                    b.HasOne("Bachelor.Models.Experience", "Experience")
                        .WithMany()
                        .HasForeignKey("ExperienceId");

                    b.HasOne("Bachelor.Models.Communities.PostTag", "PostTag")
                        .WithMany()
                        .HasForeignKey("PostTagId");

                    b.HasOne("Bachelor.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Community");

                    b.Navigation("Experience");

                    b.Navigation("PostTag");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Bachelor.Models.Experience", b =>
                {
                    b.HasOne("Bachelor.Models.Industry", "Industry")
                        .WithMany()
                        .HasForeignKey("IndustryId");

                    b.HasOne("Bachelor.Models.studentSubject", "StudentSubject")
                        .WithMany()
                        .HasForeignKey("StudentSubjectId");

                    b.HasOne("Bachelor.Models.User", "user")
                        .WithMany("experience")
                        .HasForeignKey("userId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Industry");

                    b.Navigation("StudentSubject");

                    b.Navigation("user");
                });

            modelBuilder.Entity("Bachelor.Models.Notification.Notification", b =>
                {
                    b.HasOne("Bachelor.Models.Communities.Post", "Post")
                        .WithMany()
                        .HasForeignKey("PostId");

                    b.HasOne("Bachelor.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("Post");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Bachelor.Models.Communities.Community", b =>
                {
                    b.Navigation("Communities");
                });

            modelBuilder.Entity("Bachelor.Models.Communities.Post", b =>
                {
                    b.Navigation("Comment");
                });

            modelBuilder.Entity("Bachelor.Models.User", b =>
                {
                    b.Navigation("Communities");

                    b.Navigation("experience");
                });
#pragma warning restore 612, 618
        }
    }
}
