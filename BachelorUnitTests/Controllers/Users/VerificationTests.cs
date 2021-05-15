using Bachelor.Controllers.Users;
using Bachelor.DAL;
using Bachelor.DAL.Users;
using Bachelor.Models.Users;
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

namespace BachelorUnitTests.Controllers.Users
{
    public class VerificationTests
    {
        private const int userID = 3;

        private readonly Mock<IVerificationRepository> mockRep = new Mock<IVerificationRepository>();


        [Fact]
        public async Task GetVerifiedOK()
        {
            //Arrange
            Domain domain1 = new() { Id = 1, Name = "oslomet.no", Verified = true };
            Domain domain2 = new() { Id = 2, Name = "ntnu.no", Verified = true };
            Domain domain3 = new() { Id = 3, Name = "fakestuff.com", Verified = true };

            List<Domain> domains = new() { domain1, domain2, domain3 };


            mockRep.Setup(n => n.GetVerified()).ReturnsAsync(domains);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.GetVerified() as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<List<Domain>>((List<Domain>)result.Value, domains);
        }

        [Fact]
        public async Task GetVerifiedNotFound()
        {
            //Arrange
            Domain domain1 = new() { Id = 1, Name = "oslomet.no", Verified = true };
            Domain domain2 = new() { Id = 2, Name = "ntnu.no", Verified = true };
            Domain domain3 = new() { Id = 3, Name = "fakestuff.com", Verified = true };

            List<Domain> domains = new() { domain1, domain2, domain3 };


            mockRep.Setup(n => n.GetVerified()).ReturnsAsync(()=>null);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.GetVerified() as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No verified domains found", result.Value);
        }

        [Fact]
        public async Task GetUnverifiedOK()
        {
            //Arrange
            Domain domain1 = new() { Id = 1, Name = "oslomet.no", Verified = false };
            Domain domain2 = new() { Id = 2, Name = "ntnu.no", Verified = false };
            Domain domain3 = new() { Id = 3, Name = "fakestuff.com", Verified = false };

            List<Domain> domains = new() { domain1, domain2, domain3 };


            mockRep.Setup(n => n.GetUnverified()).ReturnsAsync(domains);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.GetUnverified() as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal<List<Domain>>((List<Domain>)result.Value, domains);
        }

        [Fact]
        public async Task GetUnverifiedNotFound()
        {
            //Arrange
            Domain domain1 = new() { Id = 1, Name = "oslomet.no", Verified = true };
            Domain domain2 = new() { Id = 2, Name = "ntnu.no", Verified = true };
            Domain domain3 = new() { Id = 3, Name = "fakestuff.com", Verified = true };

            List<Domain> domains = new() { domain1, domain2, domain3 };


            mockRep.Setup(n => n.GetUnverified()).ReturnsAsync(() => null);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.GetUnverified() as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("No unverified domains found", result.Value);
        }

        [Fact]
        public async Task CheckMailOK()
        {
            //Arrange
            string address = "s333740@oslomet.no";


            mockRep.Setup(n => n.CheckMail(address)).ReturnsAsync(true);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.CheckMail(address) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task CheckMailNotFound()
        {
            //Arrange
            string address = "s333740@oslomet.no";


            mockRep.Setup(n => n.CheckMail(address)).ReturnsAsync(false);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.CheckMail(address) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("Domain was not found", result.Value);
        }

        [Fact]
        public async Task SendVerificationOK()
        {
            //Arrange
            string address = "s333740@oslomet.no";


            mockRep.Setup(n => n.SendVerification(1, address)).ReturnsAsync(true);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.SendVerification(1, address) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task SendVerificationNotFound()
        {
            //Arrange
            string address = "s333740@oslomet.no";


            mockRep.Setup(n => n.SendVerification(1, address)).ReturnsAsync(false);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.SendVerification(1, address) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("The experience was not found", result.Value);
        }

        [Fact]
        public async Task VerifyOK()
        {
            //Arrange
            mockRep.Setup(n => n.Verify(1)).ReturnsAsync(true);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.Verify(1) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task VerifyNotFound()
        {
            //Arrange
            mockRep.Setup(n => n.Verify(1)).ReturnsAsync(false);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.Verify(1) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("The experience was not found", result.Value);
        }

        [Fact]
        public async Task AddToReviewOK()
        {
            //Arrange
            Domain domain = new() { Id = 1, Name = "oslomet.no", Verified = true };

            mockRep.Setup(n => n.AddToReview(domain)).ReturnsAsync(true);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.AddToReview(domain) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task AddToReviewBadRequest()
        {
            //Arrange
            Domain domain = new() { Id = 1, Name = "oslomet.no", Verified = true };

            mockRep.Setup(n => n.AddToReview(domain)).ReturnsAsync(false);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.AddToReview(domain) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.Equal("Something unexpected happened", result.Value);
        }

        [Fact]
        public async Task AddToReviewModelState()
        {
            //Arrange
            Domain domain = new() { Id = 1, Name = "oslometno", Verified = true };

            mockRep.Setup(n => n.AddToReview(domain)).ReturnsAsync(false);
            var verificationController = new VerificationController(mockRep.Object);

            verificationController.ModelState.AddModelError("Name", "Input validation is wrong");

            //Act
            var result = await verificationController.AddToReview(domain) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.IsType<SerializableError>(result.Value);
        }

        [Fact]
        public async Task AddOK()
        {
            //Arrange
            Domain domain = new() { Id = 1, Name = "oslomet.no", Verified = true };

            mockRep.Setup(n => n.Add(domain)).ReturnsAsync(true);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.Add(domain) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task AddBadRequest()
        {
            //Arrange
            Domain domain = new() { Id = 1, Name = "oslomet.no", Verified = true };

            mockRep.Setup(n => n.Add(domain)).ReturnsAsync(false);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.Add(domain) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.Equal("Something unexpected happened", result.Value);
        }

        [Fact]
        public async Task AddModelState()
        {
            //Arrange
            Domain domain = new() { Id = 1, Name = "oslometno", Verified = true };

            mockRep.Setup(n => n.Add(domain)).ReturnsAsync(false);
            var verificationController = new VerificationController(mockRep.Object);

            verificationController.ModelState.AddModelError("Name", "Input validation is wrong");

            //Act
            var result = await verificationController.Add(domain) as BadRequestObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);
            Assert.IsType<SerializableError>(result.Value);
        }

        [Fact]
        public async Task DeleteOK()
        {
            //Arrange
            string address = "s333740@oslomet.no";


            mockRep.Setup(n => n.Delete(address)).ReturnsAsync(true);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.Delete(address) as OkObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public async Task DeleteNotFound()
        {
            //Arrange
            string address = "s333740@oslomet.no";


            mockRep.Setup(n => n.Delete(address)).ReturnsAsync(false);
            var verificationController = new VerificationController(mockRep.Object);

            //Act
            var result = await verificationController.Delete(address) as NotFoundObjectResult;

            //Assert
            Assert.Equal((int)HttpStatusCode.NotFound, result.StatusCode);
            Assert.Equal("Domain not found", result.Value);
        }
    }
}
