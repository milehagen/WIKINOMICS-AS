using Bachelor.Controllers.Notifications;
using Bachelor.DAL;
using Bachelor.DAL.Notifications;
using Bachelor.Models;
using Bachelor.Models.Communities;
using Bachelor.Models.Notification;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace BachelorUnitTests.Controllers.Notifications
{
    public class NotificationTests
    {
        private const string _noAuth = "";
        private const string _Auth = "\"+eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjMiLCJuYmYiOjE2MjAzOTQ3MjMsImV4cCI6MTY1MTkzMDcyMywiaWF0IjoxNjIwMzk0NzIzLCJpc3MiOiJLbm93T25lIiwiYXVkIjoiYXV0aGVudGlmaWNhdGlvbkNvZGUifQ.KpL-qwmghL6QN3gKP9vjpoGFFvMURj9Nz0HZzCcMN0U\"";
        private const int userID = 3;

        private readonly Mock<INotificationRepository> mockRep = new Mock<INotificationRepository>();
        private readonly Mock<IJwtTokenRepository> mockJWT = new Mock<IJwtTokenRepository>();


        [Fact]
        public async Task GetNotificationsOK()
        {
            //Arrange
            Notification noti1 = new() { Id = 1, Post = It.IsAny<Post>(), User = It.IsAny<User>(), LastNotification = "2021-01-01T12:00:00", Notify = true, Viewed = false };
            Notification noti2 = new() { Id = 2, Post = It.IsAny<Post>(), User = It.IsAny<User>(), LastNotification = "2021-01-01T12:00:00", Notify = true, Viewed = false };
            Notification noti3 = new() { Id = 3, Post = It.IsAny<Post>(), User = It.IsAny<User>(), LastNotification = "2021-01-01T12:00:00", Notify = true, Viewed = false };

            List<Notification> notifications = new() { noti1, noti2, noti3};

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.GetNotifications(3)).ReturnsAsync(notifications);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.GetNotifications(3) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<List<Notification>>((List<Notification>)result.Value, notifications);
        }

        [Fact]
        public async Task GetNotificationsNoAuth()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;

            mockRep.Setup(n => n.GetNotifications(3)).ReturnsAsync(()=>null);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(false);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.GetNotifications(3) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task GetNotificationsNotFound()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.GetNotifications(3)).ReturnsAsync(()=>null);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.GetNotifications(3) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No notifications found for user", result.Value);
        }

        [Fact]
        public async Task GetNumberOfNotificationsOK()
        {
            //Arrange
            Notification noti1 = new() { Id = 1, Post = It.IsAny<Post>(), User = It.IsAny<User>(), LastNotification = "2021-01-01T12:00:00", Notify = true, Viewed = false };
            Notification noti2 = new() { Id = 2, Post = It.IsAny<Post>(), User = It.IsAny<User>(), LastNotification = "2021-01-01T12:00:00", Notify = true, Viewed = false };
            Notification noti3 = new() { Id = 3, Post = It.IsAny<Post>(), User = It.IsAny<User>(), LastNotification = "2021-01-01T12:00:00", Notify = true, Viewed = false };

            List<Notification> notifications = new() { noti1, noti2, noti3 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.GetNumberOfNotifications(3)).ReturnsAsync(notifications.Count);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.GetNumberOfNotifications(3) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(result.Value, notifications.Count);
        }

        [Fact]
        public async Task GetNumberOfNotificationsNoAuth()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;

            mockRep.Setup(n => n.GetNumberOfNotifications(3)).ReturnsAsync(0);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(false);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.GetNumberOfNotifications(3) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task FindSubscriptionOK()
        {
            //Arrange
            Post post = new() { Id = 1 };
            User user = new() { Id = 3 };
            Notification noti1 = new() { Id = 1, Post = post, User = user, LastNotification = "2021-01-01T12:00:00", Notify = true, Viewed = false };


            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.FindSubscription(3, 1)).ReturnsAsync(noti1);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.FindSubscription(3, 1) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<Notification>((Notification)result.Value, noti1);
        }

        [Fact]
        public async Task FindSubscriptionNoAuth()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;

            mockRep.Setup(n => n.FindSubscription(3, 1)).ReturnsAsync(() => null);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(false);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.FindSubscription(3, 1) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task FindSubscriptionNotFound()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.FindSubscription(3, 1)).ReturnsAsync(() => null);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.FindSubscription(3, 1) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No subscription found for user/post combination", result.Value);
        }

        [Fact]
        public async Task SubscribeOK()
        {
            //Arrange
            Post post = new() { Id = 1 };
            User user = new() { Id = 3 };
            Notification noti1 = new() { Id = 1, Post = post, User = user, LastNotification = "2021-01-01T12:00:00", Notify = true, Viewed = false };


            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.Subscribe(noti1)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.Subscribe(noti1) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task SubscribeNoAuth()
        {
            //Arrange
            Post post = new() { Id = 1 };
            User user = new() { Id = 3 };
            Notification noti1 = new() { Id = 1, Post = post, User = user, LastNotification = "2021-01-01T12:00:00", Notify = true, Viewed = false };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;

            mockRep.Setup(n => n.Subscribe(noti1)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(false);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.Subscribe(noti1) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task SubscribeNotFound()
        {
            //Arrange
            Post post = new() { Id = 1 };
            User user = new() { Id = 3 };
            Notification noti1 = new() { Id = 1, Post = post, User = user, LastNotification = "2021-01-01T12:00:00", Notify = true, Viewed = false };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.Subscribe(noti1)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.Subscribe(noti1) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("Post or User was not found", result.Value);
        }

        [Fact]
        public async Task SubscribeModelState()
        {
            //Arrange
            Post post = new() { Id = 1 };
            User user = new() { Id = 3 };
            Notification noti1 = new() { Id = 1, Post = post, User = user, LastNotification = "2021-01-01T12:00:00", Notify = true, Viewed = false };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.Subscribe(noti1)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            notificationController.ModelState.AddModelError("Notify", "Input validation is wrong");

            //Act
            var result = await notificationController.Subscribe(noti1) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.IsType<SerializableError>(result.Value);
        }

        [Fact]
        public async Task UnsubscribeOK()
        {
            //Arrange

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.Unsubscribe(1)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.Unsubscribe(1) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task UnsubscribeNotFound()
        {
            //Arrange

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.Unsubscribe(1)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.Unsubscribe(1) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("Notification not found", result.Value);
        }

        [Fact]
        public async Task SendNotificationOK()
        {
            //Arrange

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.SendNotification(1, 3)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.SendNotification(1, 3) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task SendNotificationNotFound()
        {
            //Arrange

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.SendNotification(1, 3)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.SendNotification(1, 3) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No notifications to send to", result.Value);
        }

        [Fact]
        public async Task SetNotificationsToViewedOK()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.SetNotificationsToViewed(3)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.SetNotificationsToViewed(3) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task SetNotificationsToViewedNoAuth()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;

            mockRep.Setup(n => n.SetNotificationsToViewed(3)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(false);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.SetNotificationsToViewed(3) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task SetNotificationsToViewedNotFound()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.SetNotificationsToViewed(3)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.SetNotificationsToViewed(3) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("User or notifications not found", result.Value);
        }


        [Fact]
        public async Task ToggleMailNotificationsOK()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.ToggleMailNotifications(3)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.ToggleMailNotifications(3) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task ToggleMailNotificationsNoAuth()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;

            mockRep.Setup(n => n.ToggleMailNotifications(3)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(false);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.ToggleMailNotifications(3) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task ToggleMailNotificationsNotFound()
        {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.ToggleMailNotifications(3)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.ToggleMailNotifications(3) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("User not found", result.Value);
        }

        [Fact]
        public async Task SendMailOK()
        {
            //Arrange

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.SendMail(1, 3)).ReturnsAsync(true);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.SendMail(1, 3) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task SendMailNotFound()
        {
            //Arrange

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(n => n.SendMail(1, 3)).ReturnsAsync(false);
            mockJWT.Setup(j => j.ValidateWithAccess(httpContext, userID)).Returns(true);
            var notificationController = new NotificationController(mockRep.Object, mockJWT.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await notificationController.SendMail(1, 3) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("Post or notifications not found", result.Value);
        }
    }
}
