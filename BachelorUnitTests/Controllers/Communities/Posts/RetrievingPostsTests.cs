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
    public class RetrievingPostsTests
    {
        private const string _noAuth = "";
        private const string _Auth = "\"+eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjMiLCJuYmYiOjE2MjAzOTQ3MjMsImV4cCI6MTY1MTkzMDcyMywiaWF0IjoxNjIwMzk0NzIzLCJpc3MiOiJLbm93T25lIiwiYXVkIjoiYXV0aGVudGlmaWNhdGlvbkNvZGUifQ.KpL-qwmghL6QN3gKP9vjpoGFFvMURj9Nz0HZzCcMN0U\"";
        private const int userID = 3;

        private readonly Mock<IPostRepository> mockRep = new Mock<IPostRepository>();
        private readonly Mock<IJwtTokenRepository> mockJWT = new Mock<IJwtTokenRepository>();

        [Fact]
        public async Task GetPostsFromCommunityOK()
        {
            //Arrange
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post1 = new() { Id = 1, Text = "Post number 1", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            Post post2 = new() { Id = 2, Text = "Post number 2", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            Post post3 = new() { Id = 3, Text = "Post number 3", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            List<Post> posts = new() { post1, post2, post3 };


            mockRep.Setup(p => p.GetPostsFromCommunity(1)).ReturnsAsync(posts);
            var postController = new PostController(mockRep.Object, mockJWT.Object);

            //Act
            var result = await postController.GetPostsFromCommunity(1) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<List<Post>>((List<Post>)result.Value, posts);
        }

        [Fact]
        public async Task GetPostsFromCommunityNotFound()
        {
            //Arrange
            mockRep.Setup(p => p.GetPostsFromCommunity(1)).ReturnsAsync(() => null);
            var postController = new PostController(mockRep.Object, mockJWT.Object);

            //Act
            var result = await postController.GetPostsFromCommunity(1) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No posts found", result.Value);
        }


        [Fact]
        public async Task PaginateFromCommunityOK()
        {
            //Arrange
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post1 = new() { Id = 1, Text = "Post number 1", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            Post post2 = new() { Id = 2, Text = "Post number 2", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            Post post3 = new() { Id = 3, Text = "Post number 3", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            List<Post> posts = new() { post1, post2, post3 };


            mockRep.Setup(p => p.PaginateFromCommunity(1, 0)).ReturnsAsync(posts);
            var postController = new PostController(mockRep.Object, mockJWT.Object);

            //Act
            var result = await postController.PaginateFromCommunity(1,0) as ObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<List<Post>>((List<Post>)result.Value, posts);
        }

        [Fact]
        public async Task PaginateFromCommunityNotFound()
        {
            //Arrange
            mockRep.Setup(p => p.GetPostsFromCommunity(1)).ReturnsAsync(() => null);
            var postController = new PostController(mockRep.Object, mockJWT.Object);

            //Act
            var result = await postController.GetPostsFromCommunity(1) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No posts found", result.Value);
        }


        [Fact]
        public async Task PaginateForUserOK()
        {
            //Arrange
            User user = new() { Id = 3, Communities = new List<Community>(), Role = "admin" };
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post1 = new() { Id = 1, Text = "Post number 1", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            Post post2 = new() { Id = 2, Text = "Post number 2", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            Post post3 = new() { Id = 3, Text = "Post number 3", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            List<Post> posts = new() { post1, post2, post3 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.PaginateForUser(user.Id, 0)).ReturnsAsync(posts);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, user.Id)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.PaginateForUser(user.Id, 0) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<List<Post>>((List<Post>)result.Value, posts);
        }

        [Fact]
        public async Task PaginateForUserNoAuth()
        {
            //Arrange
            User user = new() { Id = 3, Communities = new List<Community>(), Role = "user" };
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post1 = new() { Id = 1, Text = "Post number 1", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            Post post2 = new() { Id = 2, Text = "Post number 2", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            Post post3 = new() { Id = 3, Text = "Post number 3", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            List<Post> posts = new() { post1, post2, post3 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;

            mockRep.Setup(p => p.PaginateForUser(user.Id, 0)).ReturnsAsync(()=> null);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, user.Id)).Returns(false);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.PaginateForUser(user.Id, 0) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task PaginateForUserNotFound()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(p => p.PaginateForUser(userID, 0)).ReturnsAsync(()=> null);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var postController = new PostController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await postController.PaginateForUser(userID, 0) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No posts found", result.Value);
        }

        [Fact]
        public async Task PaginatePostsOK()
        {
            //Arrange
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post1 = new() { Id = 1, Text = "Post number 1", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            Post post2 = new() { Id = 2, Text = "Post number 2", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            Post post3 = new() { Id = 3, Text = "Post number 3", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            List<Post> posts = new() { post1, post2, post3 };


            mockRep.Setup(p => p.PaginatePosts(0)).ReturnsAsync(posts);
            var postController = new PostController(mockRep.Object, mockJWT.Object);

            //Act
            var result = await postController.PaginatePosts(0) as ObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<List<Post>>((List<Post>)result.Value, posts);
        }

        [Fact]
        public async Task PaginatePostsNotFound()
        {
            //Arrange
            mockRep.Setup(p => p.PaginatePosts(0)).ReturnsAsync(() => null);
            var postController = new PostController(mockRep.Object, mockJWT.Object);

            //Act
            var result = await postController.PaginatePosts(0) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No posts found", result.Value);
        }

        [Fact]
        public async Task GetTrendingOK()
        {
            //Arrange
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post1 = new() { Id = 1, Text = "Post number 1", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            Post post2 = new() { Id = 2, Text = "Post number 2", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            Post post3 = new() { Id = 3, Text = "Post number 3", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };
            List<Post> posts = new() { post1, post2, post3 };


            mockRep.Setup(p => p.GetTrending()).ReturnsAsync(posts);
            var postController = new PostController(mockRep.Object, mockJWT.Object);

            //Act
            var result = await postController.GetTrending() as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<List<Post>>((List<Post>)result.Value, posts);
        }

        [Fact]
        public async Task GetTrendingNotFound()
        {
            //Arrange
            mockRep.Setup(p => p.GetTrending()).ReturnsAsync(() => null);
            var postController = new PostController(mockRep.Object, mockJWT.Object);

            //Act
            var result = await postController.GetTrending() as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No posts found", result.Value);
        }

        [Fact]
        public async Task GetPostOK()
        {
            //Arrange
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            Post post1 = new() { Id = 1, Text = "Post number 1", User = It.IsAny<User>(), Community = com1, Date = "2021-01-01T12:00:00", Upvotes = 0, Downvotes = 0, PostTag = null, Anonymous = true, Experience = null };


            mockRep.Setup(p => p.GetPost(1)).ReturnsAsync(post1);
            var postController = new PostController(mockRep.Object, mockJWT.Object);

            //Act
            var result = await postController.GetPost(1) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<Post>((Post)result.Value, post1);
        }

        [Fact]
        public async Task GetPostNotFound()
        {
            //Arrange
            mockRep.Setup(p => p.GetPost(1)).ReturnsAsync(() => null);
            var postController = new PostController(mockRep.Object, mockJWT.Object);

            //Act
            var result = await postController.GetPost(1) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("Post not found", result.Value);
        }

        [Fact]
        public async Task GetPostTagsOK()
        {
            //Arrange
            PostTag postTag1 = new() { Id = 1, Title = "PostTag 1" };
            PostTag postTag2 = new() { Id = 2, Title = "PostTag 2" };
            PostTag postTag3 = new() { Id = 3, Title = "PostTag 3" };
            List<PostTag> tags = new() { postTag1, postTag2, postTag3 };


            mockRep.Setup(p => p.GetPostTags()).ReturnsAsync(tags);
            var postController = new PostController(mockRep.Object, mockJWT.Object);

            //Act
            var result = await postController.GetPostTags() as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<List<PostTag>>((List<PostTag>)result.Value, tags);
        }

        [Fact]
        public async Task GetPostTagsNotFound()
        {
            //Arrange
            mockRep.Setup(p => p.GetPostTags()).ReturnsAsync(() => null);
            var postController = new PostController(mockRep.Object, mockJWT.Object);

            //Act
            var result = await postController.GetPostTags() as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No posttags found", result.Value);
        }
    }
}
