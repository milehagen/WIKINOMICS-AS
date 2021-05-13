using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Moq;
using System;
using Xunit;
using Bachelor.Models.Communities;
using Bachelor.DAL.Communities;
using Bachelor.Controllers.Communities;
using System.Threading.Tasks;
using Bachelor.Models;
using Bachelor.DAL;
using System.Collections.Generic;
using Bachelor.Models.Admin;

namespace BachelorUnitTests.Controllers.Communities.Comments
{
    public class CommentTests
    {
        private const string _noAuth = "";
        private const string _Auth = "\"+eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjMiLCJuYmYiOjE2MjAzOTQ3MjMsImV4cCI6MTY1MTkzMDcyMywiaWF0IjoxNjIwMzk0NzIzLCJpc3MiOiJLbm93T25lIiwiYXVkIjoiYXV0aGVudGlmaWNhdGlvbkNvZGUifQ.KpL-qwmghL6QN3gKP9vjpoGFFvMURj9Nz0HZzCcMN0U\"";

        private readonly Mock<ICommentRepository> mockRep = new Mock<ICommentRepository>();
        private readonly Mock<IJwtTokenRepository> mockJWT = new Mock<IJwtTokenRepository>();



        [Fact]
        public async Task PostCommentOK()
        {
            //Arrange
            DateTime now = DateTime.Now;
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };
            User user = new User { Id = 3, Age = now, Email = "magnushjk@gmail.com", Firstname = "Magnus", Lastname = "Kristiansen", Gender = "Man", Role = "admin", Communities = new List<Community>(), experience = new List<Experience>(), EmailUpdates = false, Password = "27733642b63a019a54b2915435ac09a80106a34e5955ee889ac2eb9fd5dfe029" };
            Post post = new Post { Id = 1, Community = com1, Comment = new List<Comment>(), Anonymous = true, Date = "2021-01-01T12:00:00", Downvotes = 0, Upvotes = 0, Experience = null, PostTag = null, Text = "Test postsssss", User = user };
            Comment comment = new Comment { Id = 1, Post = post, User = user, Text = "Test comment", Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, ResponsTo = null, OrderInThread = 1, Anonymous = false, Experience = null };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;


            mockRep.Setup(s => s.PostComment(1, comment)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, user.Id)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var resultat = await CommentController.PostComment(1, comment) as OkObjectResult;

            //Assert
            Assert.IsType<OkObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal(true, resultat.Value);

        }

        [Fact]
        public async Task PostCommentNoAuth()
        {
            User user = new User { Id = 3 };
            Post post = new Post { Id = 1, Community = It.IsAny<Community>(), Comment = new List<Comment>() };
            Comment comment = new Comment { Id = 1, Post = post, User = user, Text = "Test comment", Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, ResponsTo = null, OrderInThread = 1, Anonymous = false, Experience = null };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;


            mockRep.Setup(c => c.PostComment(1, comment)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, user.Id)).Returns(false);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object);

            var resultat = await CommentController.PostComment(1, comment) as UnauthorizedObjectResult;

            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal(false, resultat.Value);
        }

        [Fact]
        public async Task PostCommentModelState()
        {
            //Arrange
            User user = new User { Id = 3 };
            Post post = new Post { Id = 1, Community = It.IsAny<Community>(), Comment = new List<Comment>() };
            Comment comment = new Comment { Id = 1, Post = post, User = user, Text = "Test comment", Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, ResponsTo = null, OrderInThread = 1, Anonymous = false, Experience = null };


            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;


            mockRep.Setup(s => s.PostComment(post.Id, comment)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            CommentController.ModelState.AddModelError("Text", "Input validation is wrong");

            //Act
            var resultat = await CommentController.PostComment(post.Id, comment) as BadRequestObjectResult;

            //Assert
            Assert.IsType<BadRequestObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.IsType<SerializableError>(resultat.Value);
        }

        [Fact]
        public async Task PostCommentNotFound()
        {
            //Arrange
            DateTime now = DateTime.Now;
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };
            User user = new User { Id = 3, Age = now, Email = "magnushjk@gmail.com", Firstname = "Magnus", Lastname = "Kristiansen", Gender = "Man", Role = "admin", Communities = new List<Community>(), experience = new List<Experience>(), EmailUpdates = false, Password = "27733642b63a019a54b2915435ac09a80106a34e5955ee889ac2eb9fd5dfe029" };
            Post post = new Post { Id = 1, Community = com1, Comment = new List<Comment>(), Anonymous = true, Date = "2021-01-01T12:00:00", Downvotes = 0, Upvotes = 0, Experience = null, PostTag = null, Text = "Test postsssss", User = user };
            Comment comment = new Comment { Id = 1, Post = post, User = user, Text = "Test comment", Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, ResponsTo = null, OrderInThread = 1, Anonymous = false, Experience = null };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(s => s.PostComment(100, comment)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var resultat = await CommentController.PostComment(100, comment) as NotFoundObjectResult;

            //Assert
            Assert.IsType<NotFoundObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.NotFound, resultat.StatusCode);
            Assert.Equal(false, resultat.Value);
        }




        [Fact]
        public async Task VoteCommentOK()
        {
            //Arrange
            DateTime now = DateTime.Now;
            User user = new User { Id = 3, Age = now, Email = "magnushjk@gmail.com", Firstname = "Magnus", Lastname = "Kristiansen", Gender = "Man", Role = "admin", Communities = new List<Community>(), experience = new List<Experience>(), EmailUpdates = false, Password = "27733642b63a019a54b2915435ac09a80106a34e5955ee889ac2eb9fd5dfe029" };
            Comment comment = new Comment { Id = 1, Post = It.IsAny<Post>(), User = user, Text = "Test comment", Date = "2021-01-01T12:00:00", Upvotes = 1, Downvotes = 0, ResponsTo = null, OrderInThread = 1, Anonymous = false, Experience = null };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;


            mockRep.Setup(s => s.VoteComment(1, comment)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, user.Id)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var resultat = await CommentController.VoteComment(1, comment) as OkObjectResult;

            //Assert
            Assert.IsType<OkObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal(true, resultat.Value);

        }

        [Fact]
        public async Task VoteCommentNoAuth()
        {
            User user = new User { Id = 3 };
            Post post = new Post { Id = 1, Community = It.IsAny<Community>(), Comment = new List<Comment>() };
            Comment comment = new Comment { Id = 1, Post = post, User = user, Text = "Test comment", Date = "2021-01-01T12:00:00", Upvotes = 1, Downvotes = 0, ResponsTo = null, OrderInThread = 1, Anonymous = false, Experience = null };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;


            mockRep.Setup(c => c.VoteComment(1, comment)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, user.Id)).Returns(false);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object);

            var resultat = await CommentController.VoteComment(1, comment) as UnauthorizedObjectResult;

            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal(false, resultat.Value);
        }

        [Fact]
        public async Task VoteCommentModelState()
        {
            //Arrange
            User user = new User { Id = 3 };
            Post post = new Post { Id = 1, Community = It.IsAny<Community>(), Comment = new List<Comment>() };
            Comment comment = new Comment { Id = 1, Post = post, User = user, Text = "Test comment", Date = "2021-01-01T12:00:00", Upvotes = 1, Downvotes = 0, ResponsTo = null, OrderInThread = 1, Anonymous = false, Experience = null };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;


            mockRep.Setup(s => s.VoteComment(1, comment)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            CommentController.ModelState.AddModelError("Upvote", "Input validation is wrong");

            //Act
            var resultat = await CommentController.VoteComment(1, comment) as BadRequestObjectResult;

            //Assert
            Assert.IsType<BadRequestObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.IsType<SerializableError>(resultat.Value);
        }

        [Fact]
        public async Task VoteCommentNotFound()
        {
            //Arrange
            DateTime now = DateTime.Now;
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };
            User user = new User { Id = 3, Age = now, Email = "magnushjk@gmail.com", Firstname = "Magnus", Lastname = "Kristiansen", Gender = "Man", Role = "admin", Communities = new List<Community>(), experience = new List<Experience>(), EmailUpdates = false, Password = "27733642b63a019a54b2915435ac09a80106a34e5955ee889ac2eb9fd5dfe029" };
            Post post = new Post { Id = 1, Community = com1, Comment = new List<Comment>(), Anonymous = true, Date = "2021-01-01T12:00:00", Downvotes = 0, Upvotes = 0, Experience = null, PostTag = null, Text = "Test postsssss", User = user };
            Comment comment = new Comment { Id = 1, Post = post, User = user, Text = "Test comment", Date = "2021-01-01T12:00:00", Upvotes = 1, Downvotes = 0, ResponsTo = null, OrderInThread = 1, Anonymous = false, Experience = null };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(s => s.VoteComment(1, comment)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var resultat = await CommentController.VoteComment(1, comment) as NotFoundObjectResult;

            //Assert
            Assert.IsType<NotFoundObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.NotFound, resultat.StatusCode);
            Assert.Equal(false, resultat.Value);
        }

        [Fact]
        public async Task CheckVoteCommentOK()
        {
            //Arrange
            UserCommentVote userCommentVote = new UserCommentVote { Id = 1, CommentId = 1, UserId = 3, Voted = 0 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;


            mockRep.Setup(s => s.CheckVoteComment(userCommentVote)).ReturnsAsync(0);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var resultat = await CommentController.CheckVoteComment(userCommentVote) as OkObjectResult;

            //Assert
            Assert.IsType<OkObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal(0, resultat.Value);

        }

        [Fact]
        public async Task CheckVoteCommentNoAuth()
        {
            UserCommentVote userCommentVote = new UserCommentVote { Id = 1, CommentId = 1, UserId = 3, Voted = 0 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;


            mockRep.Setup(c => c.CheckVoteComment(userCommentVote)).ReturnsAsync(-1);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(false);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object);

            var resultat = await CommentController.CheckVoteComment(userCommentVote) as UnauthorizedObjectResult;

            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal(-1, resultat.Value);
        }

        [Fact]
        public async Task CheckVoteCommentModelState()
        {
            //Arrange
            UserCommentVote userCommentVote = new() { Id = 1, CommentId = 1, UserId = 3, Voted = 1 };
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;


            mockRep.Setup(s => s.CheckVoteComment(userCommentVote)).ReturnsAsync(-1);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            CommentController.ModelState.AddModelError("Voted", "Input validation is wrong");

            //Act
            var resultat = await CommentController.CheckVoteComment(userCommentVote) as BadRequestObjectResult;

            //Assert
            Assert.IsType<BadRequestObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.IsType<SerializableError>(resultat.Value);
        }

        [Fact]
        public async Task CheckVoteCommentOKFalse()
        {
            //Arrange
            UserCommentVote userCommentVote = new UserCommentVote { Id = 1, CommentId = 1, UserId = 3, Voted = 0 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(s => s.CheckVoteComment(userCommentVote)).ReturnsAsync(-1);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var resultat = await CommentController.CheckVoteComment(userCommentVote) as OkObjectResult;

            //Assert
            Assert.IsType<OkObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal(-1, resultat.Value);
        }


        [Fact]
        public async Task LogVoteCommentOK()
        {
            //Arrange
            UserCommentVote userCommentVote = new UserCommentVote { Id = 1, CommentId = 1, UserId = 3, Voted = 0 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;


            mockRep.Setup(s => s.LogVoteComment(userCommentVote)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var resultat = await CommentController.LogVoteComment(userCommentVote) as OkObjectResult;

            //Assert
            Assert.IsType<OkObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal(true, resultat.Value);

        }

        [Fact]
        public async Task LogVoteCommentNoAuth()
        {
            UserCommentVote userCommentVote = new UserCommentVote { Id = 1, CommentId = 1, UserId = 3, Voted = 0 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;


            mockRep.Setup(c => c.LogVoteComment(userCommentVote)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(false);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object);

            var resultat = await CommentController.LogVoteComment(userCommentVote) as UnauthorizedObjectResult;

            Assert.Equal((int)HttpStatusCode.Unauthorized, resultat.StatusCode);
            Assert.Equal(false, resultat.Value);
        }

        [Fact]
        public async Task LogVoteCommentModelState()
        {
            //Arrange
            UserCommentVote userCommentVote = new UserCommentVote { Id = 1, CommentId = 1, UserId = 3, Voted = 0 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;


            mockRep.Setup(s => s.LogVoteComment(userCommentVote)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            CommentController.ModelState.AddModelError("Voted", "Input validation is wrong");

            //Act
            var resultat = await CommentController.LogVoteComment(userCommentVote) as BadRequestObjectResult;

            //Assert
            Assert.IsType<BadRequestObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.IsType<SerializableError>(resultat.Value);
        }

        [Fact]
        public async Task LogVoteCommentNotFound()
        {
            //Arrange
            UserCommentVote userCommentVote = new UserCommentVote { Id = 1, CommentId = 1, UserId = 3, Voted = 0 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(s => s.LogVoteComment(userCommentVote)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var resultat = await CommentController.LogVoteComment(userCommentVote) as NotFoundObjectResult;

            //Assert
            Assert.IsType<NotFoundObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.NotFound, resultat.StatusCode);
            Assert.Equal(false, resultat.Value);
        }

        [Fact]
        public async Task ReportOK()
        {
            //Arrange
            CommentReport commentReport = new CommentReport { Id = 1, Comment = It.IsAny<Comment>(), LastReportDate = "2021-01-01T12:00:00", NumberOfReports = 10 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;


            mockRep.Setup(s => s.Report(commentReport)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var resultat = await CommentController.Report(commentReport) as OkObjectResult;

            //Assert
            Assert.IsType<OkObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal(true, resultat.Value);

        }

        [Fact]
        public async Task ReportModelState()
        {
            //Arrange
            CommentReport report = new() { Id = 1, Comment = It.IsAny<Comment>(), LastReportDate = "222222", NumberOfReports = 10 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;


            mockRep.Setup(s => s.Report(report)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            CommentController.ModelState.AddModelError("LastReportDate", "Input validation is wrong");

            //Act
            var resultat = await CommentController.Report(report) as BadRequestObjectResult;

            //Assert
            Assert.IsType<BadRequestObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.BadRequest, resultat.StatusCode);
            Assert.IsType<SerializableError>(resultat.Value);
        }

        [Fact]
        public async Task ReportNotFound()
        {
            //Arrange
            CommentReport commentReport = new CommentReport { Id = 1, Comment = It.IsAny<Comment>(), LastReportDate = "2021-01-01T12:00:00", NumberOfReports = 10 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(s => s.Report(commentReport)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var resultat = await CommentController.Report(commentReport);

            //Assert
            var resultatNotFound = Assert.IsType<NotFoundObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.NotFound, resultatNotFound.StatusCode);
            Assert.Equal(false, resultatNotFound.Value);
        }

        [Fact]
        public async Task DeleteOK()
        {
            //Arrange

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;


            mockRep.Setup(s => s.Delete(It.IsAny<int>())).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var resultat = await CommentController.Delete(It.IsAny<int>()) as OkObjectResult;

            //Assert
            Assert.IsType<OkObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.OK, resultat.StatusCode);
            Assert.Equal(true, resultat.Value);

        }

        [Fact]
        public async Task DeleteNotFound()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(s => s.Delete(100)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, 3)).Returns(true);

            var CommentController = new CommentController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var resultat = await CommentController.Delete(100) as NotFoundObjectResult;

            //Assert
            Assert.IsType<NotFoundObjectResult>(resultat);
            Assert.Equal((int)HttpStatusCode.NotFound, resultat.StatusCode);
            Assert.Equal(false, resultat.Value);
        }
    }
}
