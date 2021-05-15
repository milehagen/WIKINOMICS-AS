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
using Bachelor.DAL.Storage;
using System.Collections.Generic;
using Bachelor.Models.Admin;

namespace BachelorUnitTests.Controllers.Communities.Posts
{
    public class ManagementPostsTests
    {
        private const string _noAuth = "";
        private const string _Auth = "\"+eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjMiLCJuYmYiOjE2MjAzOTQ3MjMsImV4cCI6MTY1MTkzMDcyMywiaWF0IjoxNjIwMzk0NzIzLCJpc3MiOiJLbm93T25lIiwiYXVkIjoiYXV0aGVudGlmaWNhdGlvbkNvZGUifQ.KpL-qwmghL6QN3gKP9vjpoGFFvMURj9Nz0HZzCcMN0U\"";
        private const int userID = 3;

        private readonly Mock<IPostRepository> mockRep = new Mock<IPostRepository>();
        private readonly Mock<IJwtTokenRepository> mockJWT = new Mock<IJwtTokenRepository>();

        [Fact]
        public async Task PublishOK()
        {
            //Arrange
            User user = new() { Id = 3, Communities = new List<Community>(), Role = "admin" };
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post = new() { Id = 1, Text = "Post number 1", User = user, Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.Publish(post)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, user.Id)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.Publish(post) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }


        [Fact]
        public async Task PublishModelState()
        {
            //Arrange
            User user = new() { Id = 3, Communities = new List<Community>(), Role = "admin" };
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post = new() { Id = 1, Text = "Post number 1", User = user, Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };


            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.Publish(post)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, user.Id)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            postController.ModelState.AddModelError("Text", "Input validation is wrong");

            //Act
            var result = await postController.Publish(post) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.IsType<SerializableError>(result.Value);
        }


        [Fact]
        public async Task PublishNoAuth()
        {
            //Arrange
            User user = new() { Id = 3, Communities = new List<Community>(), Role = "admin" };
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post = new() { Id = 1, Text = "Post number 1", User = user, Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };


            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;

            mockRep.Setup(p => p.Publish(post)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, user.Id)).Returns(false);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.Publish(post) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task VotePostOK()
        {
            //Arrange
            User user = new() { Id = 3, Communities = new List<Community>(), Role = "admin" };
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post = new() { Id = 1, Text = "Post number 1", User = user, Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 1, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.VotePost(1, post)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, user.Id)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.VotePost(1, post) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }


        [Fact]
        public async Task VotePostModelState()
        {
            //Arrange
            User user = new() { Id = 3, Communities = new List<Community>(), Role = "admin" };
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post = new() { Id = 1, Text = "Post number 1", User = user, Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 1, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };


            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.VotePost(1, post)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, user.Id)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            postController.ModelState.AddModelError("Text", "Input validation is wrong");

            //Act
            var result = await postController.VotePost(1, post) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.IsType<SerializableError>(result.Value);
        }

        [Fact]
        public async Task VotePostNotFound()
        {
            //Arrange
            User user = new() { Id = 3, Communities = new List<Community>(), Role = "admin" };
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post = new() { Id = 1, Text = "Post number 1", User = user, Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 1, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.VotePost(1, post)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, user.Id)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.VotePost(1, post) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("The post was not found", result.Value);
        }

        [Fact]
        public async Task VotePostNoAuth()
        {
            //Arrange
            User user = new() { Id = 3, Communities = new List<Community>(), Role = "admin" };
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post = new() { Id = 1, Text = "Post number 1", User = user, Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };


            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;

            mockRep.Setup(p => p.VotePost(1, post)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, user.Id)).Returns(false);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.VotePost(1, post) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task CheckVotePostOK()
        {
            //Arrange
            UserPostVote uservote = new() { Id = 1, PostId = 1, UserId = 3, Voted = 1 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.CheckVotePost(uservote)).ReturnsAsync(1);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.CheckVotePost(uservote) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(1, result.Value);
        }


        [Fact]
        public async Task CheckVotePostModelState()
        {
            //Arrange
            UserPostVote uservote = new() { Id = 1, PostId = 1, UserId = 3, Voted = 1 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.CheckVotePost(uservote)).ReturnsAsync(-1);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            postController.ModelState.AddModelError("Voted", "Input validation is wrong");

            //Act
            var result = await postController.CheckVotePost(uservote) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.IsType<SerializableError>(result.Value);
        }

        [Fact]
        public async Task CheckVotePostOKFalse()
        {
            //Arrange
            UserPostVote uservote = new() { Id = 1, PostId = 1, UserId = 3, Voted = 1 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.CheckVotePost(uservote)).ReturnsAsync(-1);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.CheckVotePost(uservote) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(-1, result.Value);
        }

        [Fact]
        public async Task CheckVotePostNoAuth()
        {
            //Arrange
            UserPostVote uservote = new() { Id = 1, PostId = 1, UserId = 3, Voted = 1 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;

            mockRep.Setup(p => p.CheckVotePost(uservote)).ReturnsAsync(-1);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(false);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.CheckVotePost(uservote) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task LogVotePostOK()
        {
            //Arrange
            UserPostVote uservote = new() { Id = 1, PostId = 1, UserId = 3, Voted = 1 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.LogVotePost(uservote)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.LogVotePost(uservote) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }


        [Fact]
        public async Task LogVotePostModelState()
        {
            //Arrange
            UserPostVote uservote = new() { Id = 1, PostId = 1, UserId = 3, Voted = 1 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.LogVotePost(uservote)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            postController.ModelState.AddModelError("Voted", "Input validation is wrong");

            //Act
            var result = await postController.LogVotePost(uservote) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.IsType<SerializableError>(result.Value);
        }

        [Fact]
        public async Task LogVotePostNotFound()
        {
            //Arrange
            UserPostVote uservote = new() { Id = 1, PostId = 1, UserId = 3, Voted = 1 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.LogVotePost(uservote)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.LogVotePost(uservote) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("Vote could not be logged", result.Value);
        }

        [Fact]
        public async Task LogVotePostNoAuth()
        {
            //Arrange
            UserPostVote uservote = new() { Id = 1, PostId = 1, UserId = 3, Voted = 1 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;

            mockRep.Setup(p => p.LogVotePost(uservote)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(false);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.LogVotePost(uservote) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task ReportOK()
        {
            //Arrange
            User user = new() { Id = 3, Communities = new List<Community>(), Role = "admin" };
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post = new() { Id = 1, Text = "Post number 1", User = user, Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };

            PostReport report = new() { Id = 1, Post = post, LastReportDate = "2021-01-01T12:00:00", NumberOfReports = 10 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.Report(report)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.Report(report) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }


        [Fact]
        public async Task ReportModelState()
        {
            //Arrange
            User user = new() { Id = 3, Communities = new List<Community>(), Role = "admin" };
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post = new() { Id = 1, Text = "Post number 1", User = user, Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };

            PostReport report = new() { Id = 1, Post = post, LastReportDate = "2021-01-01T12:00:00", NumberOfReports = 10 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.Report(report)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            postController.ModelState.AddModelError("Voted", "Input validation is wrong");

            //Act
            var result = await postController.Report(report) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.IsType<SerializableError>(result.Value);
        }

        [Fact]
        public async Task ReportNotFound()
        {
            //Arrange
            User user = new() { Id = 3, Communities = new List<Community>(), Role = "admin" };
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post = new() { Id = 1, Text = "Post number 1", User = user, Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };

            PostReport report = new() { Id = 1, Post = post, LastReportDate = "2021-01-01T12:00:00", NumberOfReports = 10 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.Report(report)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.Report(report) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("Post could not be reported", result.Value);
        }

        [Fact]
        public async Task DeleteOK()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.Delete(1)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.Delete(1) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task DeleteNotFound()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.Delete(1)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.Delete(1) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("Post not found", result.Value);
        }
    }
}
