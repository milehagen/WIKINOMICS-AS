using Bachelor.DAL;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Bachelor.DAL.Communities;
using Bachelor.DAL.Admin;
using Bachelor.DAL.Admin.Report;
using Bachelor.DAL.Admin.Settings;
using Bachelor.DAL.Users;
using Bachelor.DAL.Notifications;

namespace Bachelor
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews()
                    .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );


            //If In Development only use shitty sqlLite DB
            if (this._env.IsDevelopment())
            {
                services.AddDbContext<UserDBContext>(options => options.UseSqlite("data source=UsersDB.db"));
            }

            //In production we use Azure leet haxor
            if (this._env.IsProduction())
            {
                services.AddDbContext<UserDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("KnowOneDB")));
            }

            // In production, the Angular files will be served from this directory
            //services.AddDbContext<UserDBContext>(options => options.UseSqlServer(Configuration.GetConnectionString("ShakusDesktop")));
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICommunitiesRepository, CommunitiesRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<IPostRepository, PostRepository>();
            services.AddScoped<IPostReportRepository, PostReportRepository>();
            services.AddScoped<ICommentReportRepository, CommentReportRepository>();
            services.AddScoped<IJwtTokenRepository, JwtTokenRepository>();
            services.AddScoped<ISiteSettingRepository, SiteSettingRepository>();
            services.AddScoped<IVerificationRepository, VerificationRepository>();
            services.AddScoped<INotificationRepository, NotificationRepository>();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                //Don't use this unless you are filling in Azure DB for the first time
                //DBInit.Initialize(app, true);

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                    DBInit.Initialize(app, false);
                }
            });
        }
    }
}
