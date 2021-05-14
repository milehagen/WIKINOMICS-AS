using Microsoft.AspNetCore.Mvc;
using Moq;
using Bachelor.Models;
using Bachelor.Models.Communities;
using Bachelor.DAL.Users;
using Bachelor.DAL.Storage;
using Bachelor.Controllers.Storage;
using Bachelor.Controllers.Communities;
using System.Threading.Tasks;
using Xunit;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.Net;

namespace BachelorUnitTests.Controllers.Storage {
    public class JwtTests {
    private const string _noAuth = "";
    private const string _Auth = "\"+eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjMiLCJuYmYiOjE2MjAzOTQ3MjMsImV4cCI6MTY1MTkzMDcyMywiaWF0IjoxNjIwMzk0NzIzLCJpc3MiOiJLbm93T25lIiwiYXVkIjoiYXV0aGVudGlmaWNhdGlvbkNvZGUifQ.KpL-qwmghL6QN3gKP9vjpoGFFvMURj9Nz0HZzCcMN0U\"";

    private const string _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjMiLCJuYmYiOjE2MjAzOTQ3MjMsImV4cCI6MTY1MTkzMDcyMywiaWF0IjoxNjIwMzk0NzIzLCJpc3MiOiJLbm93T25lIiwiYXVkIjoiYXV0aGVudGlmaWNhdGlvbkNvZGUifQ.KpL-qwmghL6QN3gKP9vjpoGFFvMURj9Nz0HZzCcMN0U";
    private const int UserID = 3;

    private readonly Mock<IUserRepository> mockRep = new Mock<IUserRepository>();

    private readonly Mock<IJwtTokenRepository> mockJwt = new Mock<IJwtTokenRepository>();

    [Fact]
    public async Task DecodeTokenOk() {
        mockJwt.Setup(t => t.ReadTokenSubject(_token)).Returns("3");

        var JwtTokenController = new JwtTokenController(mockJwt.Object);

        //Act
        var result = await JwtTokenController.DecodeToken(_token) as OkObjectResult;

        //Assert
        Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
        Assert.Equal("3",result.Value);
    }

    [Fact]

    public async Task DecodeTokenBadRequest() {
        mockJwt.Setup(t => t.ReadTokenSubject(_token)).Returns(() => null);

        var JwtTokenController = new JwtTokenController(mockJwt.Object);

        //Act
        var result = await JwtTokenController.DecodeToken(_token) as BadRequestObjectResult;

        //Assert
        Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
        Assert.Equal("Token could not be read",result.Value);
    }

    [Fact]
    public async Task ValidateTokenOk() {
        mockJwt.Setup(t => t.ValidateCurrentToken(_token)).Returns(true);

        var JwtTokenController = new JwtTokenController(mockJwt.Object);

        //Act
        var result = await JwtTokenController.ValidateToken(_token) as OkObjectResult;

        //Assert
        Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
        Assert.Equal(true,result.Value);
    }

    [Fact]
    public async Task ValidateTokenBadRequest() {
        mockJwt.Setup(t => t.ValidateCurrentToken(_token)).Returns(false);

        var JwtTokenController = new JwtTokenController(mockJwt.Object);

        //Act
        var result = await JwtTokenController.ValidateToken(_token) as BadRequestObjectResult;

        //Assert
        Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
        Assert.Equal("Token was not valid",result.Value);
    }



    }
}