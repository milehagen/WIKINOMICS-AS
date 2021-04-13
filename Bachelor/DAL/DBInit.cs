using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Bachelor.Models;
using Bachelor.Models.Admin;
using Bachelor.Models.Communities;
using Bachelor.Models.Users;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Bachelor.DAL
{
    public class DBInit
    {
        public static async void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<UserDBContext>();


                await context.Database.EnsureDeletedAsync();
                await context.Database.EnsureCreatedAsync();

                Industry industri1 = new Industry{Title = "Barn, skole og undervisning"};
                Industry industri2 = new Industry{Title = "Bil, kjøretøy og verksted"};
                Industry industri3 = new Industry{Title = "Butikk og varehandel"};
                Industry industri4 = new Industry {Title = "Bygg og anlegg"};
                Industry industri5 = new Industry {Title = "Helse og omsorg"};
                Industry industri6 = new Industry {Title = "Håndverktjenester"};
                Industry industri7 = new Industry {Title = "IT"};
                Industry industri9 = new Industry {Title = "Industri og produksjon"};
                Industry industri10 = new Industry {Title = "Konsulent og rådgivning" };
                Industry industri11 = new Industry {Title = "Offentlig administrasjon" };
                Industry industri12 = new Industry {Title = "Olje og gass"};
                Industry industri13 = new Industry {Title = "Transport og logistikk"};
                Industry industri14 = new Industry {Title = "Økonomi og regnskap"};
                Industry industri15 = new Industry {Title = "Annet"};

                List<Industry> industries = new List<Industry>
                {
                    industri1,
                    industri2,
                    industri3,
                    industri4,
                    industri5,
                    industri6,
                    industri7,
                    industri9,
                    industri10,
                    industri11,
                    industri12,
                    industri13,
                    industri14,
                    industri15,
                };

                Community subCommunity1 = new Community { Title = "Arkiv-biblotek og informasjonsfag", Level = 1 };
                Community subCommunity2 = new Community { Title = "Drama og teater", Level = 1 };
                Community subCommunity3 = new Community { Title = "Helse og sosialfag", Level = 1 };
                Community subCommunity4 = new Community { Title = "Ingeniør, teknologi og data", Level = 1 };
                Community subCommunity5 = new Community { Title = "Internasjonale og interkulturelle studier", Level = 1 };
                Community subCommunity6 = new Community { Title = "Journalistikk, kommunikasjon og mediefag", Level = 1 };
                Community subCommunity7 = new Community { Title = "Kunst og design", Level = 1 };
                Community subCommunity8 = new Community { Title = "Lærerutdanning og pedagogiske fag", Level = 1 };
                Community subCommunity9 = new Community { Title = "Mat og ernæring", Level = 1 };
                Community subCommunity10 = new Community { Title = "Tolkeutdanning og språkfag", Level = 1 };
                Community subCommunity11 = new Community { Title = "Yrkespedagogikk og yrkesfaglærerutdanning", Level = 1 };
                Community subCommunity12 = new Community { Title = "Økonomi, ledelse og samfunnsfag", Level = 1 };


                Community community1 = new Community { Title = "Barn, skole og undervisning", Level = 0, Communities = new List<Community> { subCommunity8, subCommunity11 } };
                Community community2 = new Community { Title = "Bil, kjøretøy og verksted", Level = 0 };
                Community community3 = new Community { Title = "Butikk og varehandel", Level = 0};
                Community community4 = new Community { Title = "Bygg og anlegg", Level = 0};
                Community community5 = new Community { Title = "Helse og omsorg", Level = 0, Communities = new List<Community> { subCommunity3 } };
                Community community6 = new Community { Title = "Håndverktjenester", Level = 0};
                Community community7 = new Community { Title = "IT", Level = 0, Communities = new List<Community> { subCommunity4 } };
                Community community8 = new Community { Title = "Industri og produksjon", Level = 0};
                Community community9 = new Community { Title = "Konsulent og rådgivning", Level = 0, Communities = new List<Community> { subCommunity12 } };
                Community community10 = new Community { Title = "Kunst og kultur", Level = 0, Communities = new List<Community> { subCommunity2, subCommunity7 } };
                Community community11 = new Community { Title = "Medie- og innholdsproduksjon", Level = 0, Communities = new List<Community> { subCommunity6 } };
                Community community12 = new Community { Title = "Offentlig administrasjon", Level = 0, Communities = new List<Community> { subCommunity12 } };
                Community community13 = new Community { Title = "Olje og gass", Level = 0};
                Community community14 = new Community { Title = "Transport og logistikk", Level = 0};
                Community community15 = new Community { Title = "Økonomi og regnskap", Level = 0, Communities = new List<Community> { subCommunity12 } };
                Community community16 = new Community { Title = "Annet", Level = 0, Communities = new List<Community> { subCommunity5, subCommunity9, subCommunity10, subCommunity1 } };

                List<Community> communities = new List<Community>
                {
                        community1,
                        community2,
                        community3,
                        community4,
                        community5,
                        community6,
                        community7,
                        community8,
                        community9,
                        community10,
                        community11,
                        community12,
                        community13,
                        community14,
                        community15,
                        community16
                };


                User user1 = new User { Firstname = "Martin", Lastname = "Johansen", Age = 21, Email = "martin.johansen99@hotmail.com",Password= "9d560160e5a0c246f594b76b6e8d09a0c297bb1f33d7180cdb41e318bf6150a4", Gender="man", Role="admin"};
                User user2 = new User { Firstname = "Banke", Lastname = "Biff", Age = 100, Email = "bankebiff@gmail.com", Password= "9d560160e5a0c246f594b76b6e8d09a0c297bb1f33d7180cdb41e318bf6150a4", Gender = "woman", Role ="user"};
                User user3 = new User { Firstname = "GME", Lastname = "Hold hold", Age = 90, Email = "letsGetThisMoney@rich.com", Password = "9d560160e5a0c246f594b76b6e8d09a0c297bb1f33d7180cdb41e318bf6150a4", Gender = "undefined", Role = "guest"};
                User user4 = new User { Firstname = "Magnus", Lastname = "Kristiansen", Age = 23, Email = "magnushjk@gmail.com", Password = "27733642b63a019a54b2915435ac09a80106a34e5955ee889ac2eb9fd5dfe029", Gender = "THE MAN", Role = "admin" };

                List<User> users = new List<User>
                {
                    user1,
                    user2,
                    user3,
                    user4
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
                    Text = "Did you hear about the military coup in Myanmar?",
                    Community = community1,
                    User = user1,
                    Date = new DateTime(2018, 12, 12, 22, 35, 5).ToString("s", System.Globalization.CultureInfo.InvariantCulture),
                    Upvotes = 0,
                    Downvotes = 4,
                    Comment = new List<Comment>(),
                    PostTag = postTag2,
                    Anonymous = false
                };


                Post post3 = new Post
                {
                    Text = "This is a post, a post about nothing to be honest",
                    Community = community1,
                    User = user4,
                    Date = DateTime.UtcNow.ToString("s", System.Globalization.CultureInfo.InvariantCulture),
                    Upvotes = 68,
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
                    Text = "This is a comment, and a test...",
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
                    Post = post2,
                    LastReportDate = DateTime.UtcNow.ToString("s", System.Globalization.CultureInfo.InvariantCulture),
                    NumberOfReports = 1
                };

                List<PostReport> postReports = new List<PostReport>
                {
                    postReport1
                };

                CommentReport commentReport1 = new CommentReport
                {
                    Comment = comment1,
                    LastReportDate = DateTime.UtcNow.ToString("s", System.Globalization.CultureInfo.InvariantCulture),
                    NumberOfReports = 1
                };

                List<CommentReport> commentReports = new List<CommentReport>
                {
                    commentReport1
                };

                SiteSetting setting1 = new SiteSetting
                {
                    SettingName = "PostScoreThreshold",
                    SettingValue = "-5",
                    Description = "The score threshold before a post is auto hidden"
                
                };

                SiteSetting setting2 = new SiteSetting
                {
                    SettingName = "CommentScoreThreshold",
                    SettingValue = "-5",
                    Description = "The score threshold before a comment is auto hidden"

                };

                List<SiteSetting> settings = new List<SiteSetting>
                {
                    setting1,
                    setting2
                };

                studentSubject subject1 = new studentSubject
                {
                    Title = "Arkiv-biblotek og informasjonsfag"
                };
                studentSubject subject2 = new studentSubject
                {
                    Title = "Drama og teater"
                };
                studentSubject subject3 = new studentSubject
                {
                    Title = "Helse og sosialfag"
                };
                studentSubject subject4 = new studentSubject
                {
                    Title = "Ingeniør, teknologi og data"
                };
                studentSubject subject5 = new studentSubject
                {
                    Title = "Internasjonale og interkulturelle studier"
                };
                studentSubject subject6 = new studentSubject
                {
                    Title = "Journalistikk, kommunikasjon og mediefag"
                };
                studentSubject subject7 = new studentSubject
                {
                    Title = "Kunst og design"
                };
                studentSubject subject8 = new studentSubject
                {
                    Title = "Lærerutdanning og pedagogiske fag"
                };
                studentSubject subject9 = new studentSubject
                {
                    Title = "Mat og ernæring"
                };
                studentSubject subject10 = new studentSubject
                {
                    Title = "Tolkeutdanning og språkfag"
                };
                studentSubject subject11 = new studentSubject
                {
                    Title = "Yrkespedagogikk og yrkesfaglærerutdanning"
                };
                studentSubject subject12 = new studentSubject
                {
                    Title = "Økonomi, ledelse og samfunnsfag"
                };

                List<studentSubject> studentSubjects = new List<studentSubject>
                {
                    subject1,
                    subject2,
                    subject3,
                    subject4,
                    subject5,
                    subject6,
                    subject7,
                    subject8,
                    subject9,
                    subject10,
                    subject11,
                    subject12,
                };

                var date1 = new DateTime(2000,06,12);
                var date2 = new DateTime(1999,12,12);

                Experience exp1 = new Experience {
                    occupation = "Student",
                    Industry = industri1,
                    StudentSubject = subject10,
                    startDate = date1,
                    endDate = date2,
                };
                Experience exp2 = new Experience {
                    occupation = "Annet",
                    Industry = industri12,
                    StudentSubject = subject1,
                    startDate = date2,
                    endDate = date1,
                };


                List<Experience> experiences = new List<Experience>
                {
                    exp1,
                    exp2
                };

                Domain domain1 = new Domain
                {
                    Name = "gmail.com"
                };

                List<Domain> domains = new List<Domain>
                {
                    domain1
                };


                await context.Users.AddRangeAsync(users);
                await context.Communities.AddRangeAsync(communities);
                await context.PostTags.AddRangeAsync(postTags);
                await context.Posts.AddRangeAsync(posts);
                await context.PostReports.AddRangeAsync(postReports);
                await context.CommentReports.AddRangeAsync(commentReports);
                await context.SiteSettings.AddRangeAsync(settings);
                await context.Industries.AddRangeAsync(industries);
                await context.Subjects.AddRangeAsync(studentSubjects);
                await context.Experiences.AddRangeAsync(experiences);
                await context.Domains.AddRangeAsync(domains);
                await context.SaveChangesAsync();
            }
        }
    }
}
