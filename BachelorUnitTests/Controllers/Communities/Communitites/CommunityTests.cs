using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Bachelor.Models.Communities;
using Bachelor.DAL.Communities;
using Bachelor.Controllers.Communities;
using System.Threading.Tasks;
using Xunit;
using System.Net;

namespace BachelorUnitTests.Controllers.Communities.Communitites
{
    public class CommunityTests
    {
        [Fact]
        public async Task GetAllCommunititesOK()
        {
            //Arrange
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };
            Community com2 = new Community { Id = 2, Title = "Community 2", Description = "Test community", Level = 0, Communities = new List<Community>() };
            Community com3 = new Community { Id = 3, Title = "Community 3", Description = "Test community", Level = 0, Communities = new List<Community>() };
            List<Community> comList = new List<Community> { com1, com2, com3 };

            var mock = new Mock<ICommunitiesRepository>();
            mock.Setup(c => c.GetAllCommunities()).ReturnsAsync(comList);
            var communityController = new CommunityController(mock.Object);

            //Act
            var result = await communityController.GetAllCommunities() as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<List<Community>>((List<Community>)result.Value, comList);
        }

        [Fact]
        public async Task GetAllCommunititesNotFound()
        {
            //Arrange
            var mock = new Mock<ICommunitiesRepository>();
            mock.Setup(c => c.GetAllCommunities()).ReturnsAsync(()=>null);
            var communityController = new CommunityController(mock.Object);

            //Act
            var result = await communityController.GetAllCommunities() as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No communitites found", result.Value);
        }


        [Fact]
        public async Task GetCommunititesByLevelOK()
        {
            //Arrange
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };
            Community com2 = new Community { Id = 2, Title = "Community 2", Description = "Test community", Level = 0, Communities = new List<Community>() };
            Community com3 = new Community { Id = 3, Title = "Community 3", Description = "Test community", Level = 0, Communities = new List<Community>() };
            List<Community> comList = new List<Community> { com1, com2, com3 };

            var mock = new Mock<ICommunitiesRepository>();
            mock.Setup(c => c.GetCommunitiesByLevel(0)).ReturnsAsync(comList);
            var communityController = new CommunityController(mock.Object);

            //Act
            var result = await communityController.GetCommunitiesByLevel(0) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<List<Community>>((List<Community>)result.Value, comList);
        }

        [Fact]
        public async Task GetCommunititesByLevelNotFound()
        {
            //Arrange
            var mock = new Mock<ICommunitiesRepository>();
            mock.Setup(c => c.GetCommunitiesByLevel(0)).ReturnsAsync(() => null);
            var communityController = new CommunityController(mock.Object);

            //Act
            var result = await communityController.GetCommunitiesByLevel(0) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No communitites by that level found", result.Value);
        }




        [Fact]
        public async Task GetCommunityOK()
        {
            //Arrange
            Community com1 = new Community { Id = 1, Title = "Community 1", Description = "Test community", Level = 0, Communities = new List<Community>() };

            var mock = new Mock<ICommunitiesRepository>();
            mock.Setup(c => c.GetCommunity(1)).ReturnsAsync(com1);
            var communityController = new CommunityController(mock.Object);

            //Act
            var result = await communityController.GetCommunity(1) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<Community>((Community)result.Value, com1);
        }

        [Fact]
        public async Task GetCommunityNotFound()
        {
            //Arrange
            var mock = new Mock<ICommunitiesRepository>();
            mock.Setup(c => c.GetCommunity(1)).ReturnsAsync(() => null);
            var communityController = new CommunityController(mock.Object);

            //Act
            var result = await communityController.GetCommunity(1) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No community found by that ID", result.Value);
        }
    }
}
