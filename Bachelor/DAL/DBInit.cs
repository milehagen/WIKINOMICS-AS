using System;
using System.Collections.Generic;
using Bachelor.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Bachelor.DAL
{
    public class DBInit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<UserDBContext>();

                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                User user1 = new User { firstname = "Martin", lastname = "Johansen", age = 21, email = "martin.johansen99@hotmail.com" };
                User user2 = new User { firstname = "Banke", lastname = "Biff", age = 100, email = "bankebiff@gmail.com" };

                List<User> users = new List<User>
                {
                    user1,
                    user2
                };

                context.Users.AddRange(users);
                context.SaveChanges();

            }
        }
    }
}
