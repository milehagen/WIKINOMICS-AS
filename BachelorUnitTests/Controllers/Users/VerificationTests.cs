using Bachelor.DAL.Storage;
using Bachelor.DAL.Users;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BachelorUnitTests.Controllers.Users
{
    public class VerificationTests
    {
        private const string _noAuth = "";
        private const string _Auth = "\"+eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjMiLCJuYmYiOjE2MjAzOTQ3MjMsImV4cCI6MTY1MTkzMDcyMywiaWF0IjoxNjIwMzk0NzIzLCJpc3MiOiJLbm93T25lIiwiYXVkIjoiYXV0aGVudGlmaWNhdGlvbkNvZGUifQ.KpL-qwmghL6QN3gKP9vjpoGFFvMURj9Nz0HZzCcMN0U\"";
        private const int userID = 3;

        private readonly Mock<IVerificationRepository> mockRep = new Mock<IVerificationRepository>();
        private readonly Mock<IJwtTokenRepository> mockJWT = new Mock<IJwtTokenRepository>();
    }
}
