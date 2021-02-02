using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Bachelor.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Bachelor.DAL
{
    public class DBInit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<UserDBContext>();

                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                User user1 = new User { firstname = "Martin", lastname = "Johansen", age = 21, email = "martin.johansen99@hotmail.com",password= "2f3f958b5ff86c3bfa2abea0a3c4a89de0c5705f9bc9dc92afbc1df6f5867c0c" };
                User user2 = new User { firstname = "Banke", lastname = "Biff", age = 100, email = "bankebiff@gmail.com", password= "2f3f958b5ff86c3bfa2abea0a3c4a89de0c5705f9bc9dc92afbc1df6f5867c0c" };

                List<User> users = new List<User>
                {
                    user1,
                    user2
                };


                Community community1 = new Community { Title = "Professional Wrestlers" };
                Community community2 = new Community { Title = "Software Developers" };

                List<Community> communities = new List<Community>
                    {
                        community1,
                        community2
                    };

                Post post1 = new Post
                {
                    Text = "This is a test",
                    Community = community1,
                    UserID = "Anon123213123123",
                    Date = new DateTime(2012, 12, 12, 22, 35, 5),
                    Upvotes = 0,
                    Downvotes = 0,
                    Comment = new List<Comment>()
                };

                Post post2 = new Post
                {
                    Text = "What do you mean this is a copy of reddit??",
                    Community = community1,
                    UserID = "Anon89696796796",
                    Date = DateTime.UtcNow,
                    Upvotes = 0,
                    Downvotes = 0,
                    Comment = new List<Comment>()
                };



                Comment comment1 = new Comment
                {
                    Text = "Wow what a cool post!",
                    UserID = "Anon3939558",
                    Date = DateTime.UtcNow,
                    Upvotes = 0,
                    Downvotes = 0
                };

                Comment comment2 = new Comment
                {
                    Text = "The earth is flat, WAKE UP SHEEPLE!",
                    UserID = "Anon6776767667",
                    Date = DateTime.UtcNow,
                    Upvotes = 0,
                    Downvotes = 0
                };

                Comment comment3 = new Comment
                {
                    Text = "I wonder if jfgjggjgjgjjgjgjgjgjgjgjjgjgjgjgjgjgj",
                    UserID = "Anon6969696969",
                    Date = DateTime.UtcNow,
                    Upvotes = 0,
                    Downvotes = 0
                };

                post1.Comment.Add(comment1);
                post2.Comment.Add(comment2);
                post2.Comment.Add(comment3);

                List<Post> posts = new List<Post>
                {
                    post1,
                    post2
                };

                context.Users.AddRange(users);
                context.Communities.AddRangeAsync(communities);
                context.Posts.AddRangeAsync(posts);
                context.SaveChanges();

            }
        }
    }
}
