using Microsoft.AspNetCore.Mvc;
using Moq;
using Bachelor.Models;
using Bachelor.Models.Communities;
using Bachelor.DAL.Users;
using Bachelor.DAL.Storage;
using Bachelor.Controllers.Users;
using System.Threading.Tasks;
using Xunit;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.Net;

namespace BachelorUnitTests.Controllers.Users {
    public class UserTests {
    private const string _noAuth = "";
    private const string _Auth = "\"+eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjMiLCJuYmYiOjE2MjAzOTQ3MjMsImV4cCI6MTY1MTkzMDcyMywiaWF0IjoxNjIwMzk0NzIzLCJpc3MiOiJLbm93T25lIiwiYXVkIjoiYXV0aGVudGlmaWNhdGlvbkNvZGUifQ.KpL-qwmghL6QN3gKP9vjpoGFFvMURj9Nz0HZzCcMN0U\"";
    private const int UserID = 3;

    private readonly Mock<IUserRepository> mockRep = new Mock<IUserRepository>();

    private readonly Mock<IJwtTokenRepository> mockJwt = new Mock<IJwtTokenRepository>();

        [Fact]
        public async Task GetUserOk()
        {
        //Arrange
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;
        

        mockRep.Setup(u => u.GetUser(3)).ReturnsAsync(user1);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
            ControllerContext = new ControllerContext() {
                HttpContext = httpContext
            }
        };

        //ACT
        var result = await UserController.GetUser(3) as OkObjectResult;

        //Assert
        Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
        Assert.Equal<User>((User)result.Value, user1);
        }

        [Fact]
        public async Task GetUserNoAuth() {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _noAuth;

            mockRep.Setup(u => u.GetUser(3)).ReturnsAsync(() => null);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(false);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await UserController.GetUser(3) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task GetUserNotFound() {
            //Arrange
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.GetUser(3)).ReturnsAsync(() => null);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await UserController.GetUser(3) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]

        public async Task AddUserOk() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.AddUser(user1)).ReturnsAsync(true);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            //ACT
        var result = await UserController.addUser(user1) as OkObjectResult;

        //Assert
        Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
        Assert.Equal(true, result.Value);
        }

        [Fact]

        public async Task AddUserModelState() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.AddUser(user1)).ReturnsAsync(false);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            UserController.ModelState.AddModelError("Notify", "Input validation is wrong");

            //Act
            var result = await UserController.addUser(user1) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.IsType<SerializableError>(result.Value);
        }

        [Fact]
        public async Task AddUserRegistered() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.AddUser(user1)).ReturnsAsync(false);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await UserController.addUser(user1) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.Equal("Couldn't add user",result.Value);
        }

        [Fact]

        public async Task LogInOk() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.LogIn(user1)).ReturnsAsync(true);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await UserController.LogIn(user1) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task LogInNotFound() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.LogIn(user1)).ReturnsAsync(false);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await UserController.LogIn(user1) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task LogInModelState() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        
        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.LogIn(user1)).ReturnsAsync(false);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            UserController.ModelState.AddModelError("Notify", "Input validation is wrong");

            //Act
            var result = await UserController.LogIn(user1) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.IsType<SerializableError>(result.Value);
        }

        [Fact]
        public async Task GetAllIndustriesOk() {
            Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
            Industry industry2 = new Industry {IndustryId = 2, Title = "Industry 2"};
            Industry industry3 = new Industry {IndustryId = 3, Title = "Industry 3"};
            List<Industry> indList = new List<Industry> {industry1, industry2, industry3 };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.GetAllIndustries()).ReturnsAsync(indList);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await UserController.GetAllIndustries() as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<List<Industry>>((List<Industry>)result.Value, indList);
        }

        [Fact]
        public async Task GetAllIndustriesNotFound() {
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.GetAllIndustries()).ReturnsAsync(() => null);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await UserController.GetAllIndustries() as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No industries found",result.Value);
        }

        [Fact]
        public async Task GetAllStudentSubjectsOk() {
            studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
            studentSubject sub2 = new studentSubject {StudentSubjectId = 2, Title = "sub2"};
            studentSubject sub3 = new studentSubject {StudentSubjectId = 3, Title = "sub3"};
            List<studentSubject> subList = new List<studentSubject> {sub1, sub2, sub3 };

             var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.GetAllStudentSubjects()).ReturnsAsync(subList);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await UserController.GetAllStudentSubjects() as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<List<studentSubject>>((List<studentSubject>)result.Value, subList);
        }

        [Fact]
        public async Task GetAllStudentSubjectsNotFound() {
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.GetAllStudentSubjects()).ReturnsAsync(() => null);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await UserController.GetAllStudentSubjects() as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No subjects found",result.Value);
        }
    
        [Fact]
        public async Task SubscribeOk() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.Subscribe(3,com1)).ReturnsAsync(true);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
            ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

        //Act
        var result = await UserController.Subscribe(3, com1) as OkObjectResult;

        //Assert
        Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
        Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task SubscribeNotFound() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.Subscribe(3,com1)).ReturnsAsync(false);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
            ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

        //Act
        var result = await UserController.Subscribe(3, com1) as NotFoundObjectResult;

        //Assert
        Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
        Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task SubscribeModelState() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.Subscribe(3,com1)).ReturnsAsync(false);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
            ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

        UserController.ModelState.AddModelError("Notify", "Input validation is wrong");

        //Act
        var result = await UserController.Subscribe(3, com1) as BadRequestObjectResult;

        

        //Assert
        Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
        Assert.IsType<SerializableError>(result.Value);
        }

        [Fact]
        public async Task UnsubscribeOk() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.Unsubscribe(3,com1)).ReturnsAsync(true);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
            ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

        //Act
        var result = await UserController.Unsubscribe(3, com1) as OkObjectResult;

        //Assert
        Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
        Assert.Equal(true, result.Value);
        }


        [Fact]
        public async Task UnsubscribeNotFound() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.Unsubscribe(3,com1)).ReturnsAsync(false);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
            ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

        //Act
        var result = await UserController.Unsubscribe(3, com1) as NotFoundObjectResult;

        //Assert
        Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
        Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task UnsubscribeModelState() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

        var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.Unsubscribe(3,com1)).ReturnsAsync(false);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
            ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

        UserController.ModelState.AddModelError("Notify", "Input validation is wrong");

        //Act
        var result = await UserController.Unsubscribe(3, com1) as BadRequestObjectResult;

        //Assert
        Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
        Assert.IsType<SerializableError>(result.Value);
        }

        [Fact]
        public async Task PostExpInfoOk() {
            User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
            studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
            Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
            Experience exp = new Experience { Id = 1, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.PostExpInfo(exp)).ReturnsAsync(true);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                    }
                };

                //Act
                var result = await UserController.PostExpinfo(exp) as OkObjectResult;

                //Assert
                Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
                Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task PostExpInfoModelState() {
            User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
            studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
            Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
            Experience exp = new Experience { Id = 1, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.PostExpInfo(exp)).ReturnsAsync(false);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                    }
                };

                UserController.ModelState.AddModelError("Notify", "Input validation is wrong");

                //Act
                var result = await UserController.PostExpinfo(exp) as BadRequestObjectResult;

                //Assert
                Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
                Assert.IsType<SerializableError>(result.Value);
        }

        [Fact]
        public async Task PostExpInfoNotFound() {
            User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
            studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
            Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
            Experience exp = new Experience { Id = 1, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.PostExpInfo(exp)).ReturnsAsync(false);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                    }
                };

                //Act
                var result = await UserController.PostExpinfo(exp) as NotFoundObjectResult;

                //Assert
                Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
                Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task AddExperienceOk() {
            User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
            studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
            Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
            Experience exp = new Experience { Id = 1, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.AddExperience(exp, 3)).ReturnsAsync(true);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                    }
                };

                //Act
                var result = await UserController.AddExperience(exp,3) as OkObjectResult;

                //Assert
                Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
                Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task AddExperienceNotFound() {
            User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
            studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
            Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
            Experience exp = new Experience { Id = 1, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.AddExperience(exp, 3)).ReturnsAsync(false);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                    }
                };

                //Act
                var result = await UserController.AddExperience(exp,3) as NotFoundObjectResult;

                //Assert
                Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
                Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task AddExperienceBadRequest() {
            User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
            studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
            Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
            Experience exp = new Experience { Id = 1, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.AddExperience(exp, 3)).ReturnsAsync(false);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                    }
                };

                UserController.ModelState.AddModelError("Notify", "Input validation is wrong");

                //Act
                var result = await UserController.AddExperience(exp,3) as BadRequestObjectResult;

                //Assert
                Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
                Assert.IsType<SerializableError>(result.Value);
        }

        [Fact]
        public async Task GetExperiencesOk() {
            User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
            studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
            Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
            Experience exp1 = new Experience { Id = 1, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };
            Experience exp2 = new Experience { Id = 2, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };
            List<Experience> expList = new List<Experience>() { exp1, exp2 };
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.GetExperiences(user1)).ReturnsAsync(expList);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                    }
                };

                //Act
                var result = await UserController.GetExperiences(user1) as OkObjectResult;

                //Assert
                Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
                Assert.Equal<List<Experience>>((List<Experience>)result.Value, expList);
        }

        [Fact]
        public async Task GetExperiencesNotFound() {
            User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
            studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
            Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
            Experience exp1 = new Experience { Id = 1, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };
            Experience exp2 = new Experience { Id = 2, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };
            List<Experience> expList = new List<Experience>() { exp1, exp2 };
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.GetExperiences(user1)).ReturnsAsync(() => null);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                    }
                };

                //Act
                var result = await UserController.GetExperiences(user1) as NotFoundObjectResult;

                //Assert
                Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
                Assert.Equal("No experiences found for user", result.Value);
        }

        [Fact]
        public async Task GetExperienceOk() {
            User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
            studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
            Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
            Experience exp1 = new Experience { Id = 1, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };
        
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.GetExperience(3)).ReturnsAsync(exp1);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                    }
                };

            //Act
            var result = await UserController.GetExperience(3) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<Experience>((Experience)result.Value, exp1);
        }

        [Fact]
        public async Task GetExperienceUnauthorized() {
           User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
            studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
            Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
            Experience exp1 = new Experience { Id = 1, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };
        
            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = _Auth;

            mockRep.Setup(u => u.GetExperience(3)).ReturnsAsync(exp1);
            mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(false);
            var UserController = new UserController(mockRep.Object, mockJwt.Object) {
                ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                    }
                };

            //Act
            var result = await UserController.GetExperience(3) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task PatchExperienceOk() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
        Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
        Experience exp1 = new Experience { Id = 1, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };
        
         var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.patchExperience(exp1)).ReturnsAsync(true);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
            ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await UserController.patchExperience(exp1) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task PatchExperienceNoAuth() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
        Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
        Experience exp1 = new Experience { Id = 1, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };
        
         var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.patchExperience(exp1)).ReturnsAsync(true);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(false);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
            ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await UserController.patchExperience(exp1) as UnauthorizedObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.Unauthorized, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task PatchExperienceBadRequest() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
        Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
        Experience exp1 = new Experience { Id = 1, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };
        
         var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.patchExperience(exp1)).ReturnsAsync(false);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
            ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            //Act
            var result = await UserController.patchExperience(exp1) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.Equal(false, result.Value);
        }

        [Fact]
        public async Task PatchExperienceModelState() {
        User user1 = new User { Id = 3, Firstname = "Martin", Lastname = "johansen", Email = "martin.johansen99@hotmail.com", Password="Password123", Age= new DateTime(), Gender="Male", EmailUpdates=true, experience= new List<Experience>(), Communities = new List<Community>(), Role="Sjef"};
        studentSubject sub1 = new studentSubject {StudentSubjectId = 1, Title = "sub1"};
        Industry industry1 = new Industry {IndustryId = 1, Title = "Industry 1"};
        Experience exp1 = new Experience { Id = 1, occupation = "Student", Industry = industry1, StudentSubject = sub1, startDate = new DateTime(), endDate = new DateTime(), business = "KnowOne", questionRole = "Student", questionBest = "Learning", questionAdvice = "Learn even more", questionChallenging = "everything", user = user1, Verified = true };
        
         var httpContext = new DefaultHttpContext();
        httpContext.Request.Headers["Authorization"] = _Auth;

        mockRep.Setup(u => u.patchExperience(exp1)).ReturnsAsync(false);
        mockJwt.Setup(j => j.ValidateWithAccess(httpContext, UserID)).Returns(true);
        var UserController = new UserController(mockRep.Object, mockJwt.Object) {
            ControllerContext = new ControllerContext() {
                    HttpContext = httpContext
                }
            };

            UserController.ModelState.AddModelError("Notify", "Input validation is wrong");

            //Act
            var result = await UserController.patchExperience(exp1) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.IsType<SerializableError>(result.Value);
        }
    
    
    
    }
}