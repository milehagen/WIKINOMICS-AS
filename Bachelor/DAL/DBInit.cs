using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Bachelor.Models;
using Bachelor.Models.Admin;
using Bachelor.Models.Communities;
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

                User user1 = new User { firstname = "Martin", lastname = "Johansen", age = 21, email = "martin.johansen99@hotmail.com",password= "9d560160e5a0c246f594b76b6e8d09a0c297bb1f33d7180cdb41e318bf6150a4", role="admin" };
                User user2 = new User { firstname = "Banke", lastname = "Biff", age = 100, email = "bankebiff@gmail.com", password= "9d560160e5a0c246f594b76b6e8d09a0c297bb1f33d7180cdb41e318bf6150a4", role="user" };
                User user3 = new User { firstname = "GME", lastname = "Hold hold", age = 90, email = "letsGetThisMoney@rich.com", password = "9d560160e5a0c246f594b76b6e8d09a0c297bb1f33d7180cdb41e318bf6150a4", role = "guest" };
                User user4 = new User { firstname = "Magnus", lastname = "Kristiansen", age = 23, email = "magnushjk@gmail.com", password = "27733642b63a019a54b2915435ac09a80106a34e5955ee889ac2eb9fd5dfe029", role = "admin" };

                List<User> users = new List<User>
                {
                    user1,
                    user2,
                    user3
                    user4
                };


                Community community1 = new Community 
                { 
                    Title = "Professional Wrestlers", 
                    Description = "Professional wrestling, or simply wrestling, is a form of wrestling and athletic theatrical performance wherein athletic " +
                                  "performers portray prizefighters competing in matches with predetermined, scripted outcomes." 
                };

                Community community2 = new Community 
                { 
                    Title = "Software Developers", 
                    Description = "Software development is the process of conceiving, specifying, designing, programming, documenting, testing, and bug fixing " +
                                  "involved in creating and maintaining applications, frameworks, or other software components" 
                };

                List<Community> communities = new List<Community>
                    {
                        community1,
                        community2
                    };

                PostTag postTag1 = new PostTag { Title = "Seeking advice" };
                PostTag postTag2 = new PostTag { Title = "Question" };
                PostTag postTag3 = new PostTag { Title = "Announcement" };

                List<PostTag> postTags = new List<PostTag>
                {
                    postTag1,
                    postTag2,
                    postTag3
                };

                Post post1 = new Post
                {
                    Text = "This is a test, aaaaaaaa character limit aaaaaaaa",
                    Community = community1,
                    User = user4,
                    Date = new DateTime(2012, 12, 12, 22, 35, 5).ToString("s", System.Globalization.CultureInfo.InvariantCulture),
                    Upvotes = 20,
                    Downvotes = 0,
                    Comment = new List<Comment>(),
                    PostTag = postTag3,
                    Anonymous = true
                };

                Post post2 = new Post
                {
                    Text = "Did you hear about the military coup in Myanmar",
                    Community = community1,
                    User = user1,
                    Date = DateTime.UtcNow.ToString("s", System.Globalization.CultureInfo.InvariantCulture),
                    Upvotes = 0,
                    Downvotes = 4,
                    Comment = new List<Comment>(),
                    PostTag = postTag2,
                    Anonymous = false
                };


                Post post3 = new Post
                {
                    Text = "This is a post in different community, VERY COOL",
                    Community = community2,
                    User = user4,
                    Date = DateTime.UtcNow.ToString("s", System.Globalization.CultureInfo.InvariantCulture),
                    Upvotes = 69,
                    Downvotes = 0,
                    Comment = new List<Comment>(),
                    PostTag = postTag1,
                    Anonymous = true
                };


                Comment comment1 = new Comment
                {
                    Text = "Wow what a cool post!",
                    User = user1,
                    Date = DateTime.UtcNow.ToString("s", System.Globalization.CultureInfo.InvariantCulture),
                    Upvotes = 0,
                    Downvotes = 0,
                    Anonymous = true
                };

                Comment comment2 = new Comment
                {
                    Text = "The earth is flat, WAKE UP SHEEPLE!",
                    User = user4,
                    Date = DateTime.UtcNow.ToString("s", System.Globalization.CultureInfo.InvariantCulture),
                    Upvotes = 0,
                    Downvotes = 0,
                    Anonymous = true
                };

                Comment comment3 = new Comment
                {
                    Text = "I wonder if jfgjggjgjgjjgjgjgjgjgjgjjgjgjgjgjgjgj",
                    User = user2,
                    Date = DateTime.UtcNow.ToString("s", System.Globalization.CultureInfo.InvariantCulture),
                    Upvotes = 0,
                    Downvotes = 0,
                    Anonymous = true
                };

                post1.Comment.Add(comment1);
                post2.Comment.Add(comment2);
                post2.Comment.Add(comment3);

                List<Post> posts = new List<Post>
                {
                    post1,
                    post2,
                    post3
                };

                PostReport postReport1 = new PostReport
                {
                    Post = post1,
                    LastReportDate = DateTime.UtcNow.ToString("s", System.Globalization.CultureInfo.InvariantCulture),
                    NumberOfReports = 1
                };

                List<PostReport> postReports = new List<PostReport>
                {
                    postReport1
                };

                CommentReport commentReport1 = new CommentReport
                {
                    Comment = comment2,
                    LastReportDate = DateTime.UtcNow.ToString("s", System.Globalization.CultureInfo.InvariantCulture),
                    NumberOfReports = 1
                };

                List<CommentReport> commentReports = new List<CommentReport>
                {
                    commentReport1
                };

                context.Users.AddRange(users);
                context.Communities.AddRangeAsync(communities);
                context.PostTags.AddRangeAsync(postTags);
                context.Posts.AddRangeAsync(posts);
                context.PostReports.AddRangeAsync(postReports);
                context.CommentReports.AddRangeAsync(commentReports);
                context.SaveChanges();

            }
        }
    }
}
