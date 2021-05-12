using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Bachelor.Models;
using Bachelor.Models.Communities;
using Bachelor.Models.Notification;
using Castle.Core.Internal;
using Microsoft.EntityFrameworkCore;

namespace Bachelor.DAL.Notifications
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly UserDBContext _db;

        public NotificationRepository(UserDBContext db)
        {
            _db = db;
        }


        public async Task<List<Notification>> GetNotifications(int userId)
        {
            try
            {
                List<Notification> notifications = await _db.Notifications.Where(noti => noti.User.Id == userId).ToListAsync();
                return notifications;
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
                return null;
            }
        }

        public async Task<int> GetNumberOfNotifications(int userId)
        {
            try
            {
                int numberOfNotifications = await _db.Notifications.CountAsync(noti => noti.User.Id == userId && noti.Notify == true && noti.Viewed == false);
                return numberOfNotifications;
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
                return 0;
            }
        }

        public async Task<Notification> FindSubscription(int userId, int postId)
        {
            try
            {
                Notification checkNotification = await _db.Notifications.FirstOrDefaultAsync(noti => noti.User.Id == userId && noti.Post.Id == postId);

                if (checkNotification != null)
                {
                    return checkNotification;
                }
                return null;
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
                return null;
            }
        }

        public async Task<bool> Subscribe(Notification notification)
        {
            try
            {
                bool checkDuplicate = await _db.Notifications.AnyAsync(noti => noti.User.Id == notification.User.Id && noti.Post.Id == notification.Post.Id);

                if (checkDuplicate)
                {
                    return false;
                }

                User checkUser = await _db.Users.FindAsync(notification.User.Id);
                Post checkPost = await _db.Posts.FindAsync(notification.Post.Id);

                if(checkUser != null && checkPost != null)
                {
                    Notification newNotification = new()
                    {
                        User = checkUser,
                        Post = checkPost,
                        Notify = false,
                        Viewed = false
                    };

                    await _db.Notifications.AddAsync(newNotification);
                    await _db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> Unsubscribe(int notificationId)
        {
            try
            {
                Notification checkNotification = await _db.Notifications.FindAsync(notificationId);

                if (checkNotification != null) {
                    _db.Notifications.Remove(checkNotification);
                    await _db.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch(Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> SendNotification(int postId, int userCreatingNotiId)
        {
            try
            {
                List<Notification> checkNotification = await _db.Notifications.Where(noti => noti.Post.Id == postId && noti.User.Id != userCreatingNotiId).ToListAsync();

                if (!checkNotification.IsNullOrEmpty())
                {
                    //Date
                    string dateNowUTC = string.Format("{0:yyyy-MM-ddTHH:mm:ss.FFFZ}", DateTime.UtcNow);

                    //Loops all notifications and updates them
                    foreach (var noti in checkNotification)
                    {
                        noti.Notify = true;
                        noti.Viewed = false;
                        noti.LastNotification = dateNowUTC;
                    };
                    await _db.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> SetNotificationsToViewed(int userId)
        {
            try
            {
                List<Notification> checkNotifications = await _db.Notifications.Where(noti => noti.User.Id == userId).ToListAsync();
                if (!checkNotifications.IsNullOrEmpty())
                {
                    foreach(var noti in checkNotifications)
                    {
                        noti.Viewed = true;
                        noti.Notify = false;
                    };
                    await _db.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
                return false;
            }

        }


        public async Task<bool> ToggleMailNotifications(int userId)
        {
            try
            {
                User foundUser = await _db.Users.FindAsync(userId);

                if(foundUser != null)
                {
                    foundUser.EmailUpdates = !foundUser.EmailUpdates;
                    await _db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> SendMail(int postId, int userCreatingNotiId)
        {
            List<Notification> checkNotifications = new();

            try
            {
                checkNotifications = await _db.Notifications.Where(noti => noti.Post.Id == postId && noti.User.Id != userCreatingNotiId).ToListAsync();

                if (checkNotifications.IsNullOrEmpty())
                {
                    return false;
                }

            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
                return false;
            }

            var fromAddress = new MailAddress("newsletter@knowone.no", "KnowONE");
            var fromPassword = "opvkxjncelsnwrlk";

            SmtpClient MailClient = new SmtpClient("smtp.gmail.com", 587);
            MailClient.EnableSsl = true;
            MailClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            MailClient.Credentials = new System.Net.NetworkCredential(fromAddress.Address, fromPassword);
            MailClient.Timeout = 20000;


            foreach(var noti in checkNotifications)
            {
                //TODO: Check if user wants mail updates
                if (noti.User.EmailUpdates)
                {
                    string body = "<h2>Hello " + noti.User.Firstname + " </h2>" +
                                  "<p><b>There has been an update in the thread:</b> <br />" +
                                   "" + noti.Post.Text + "</p> <br />";

                    string urlHostname = "https://localhost";
                    string urlContent = "/communities/" + noti.Post.Community.Id + "/post/" + noti.Post.Id;
                    string url = "<b><a href =" + urlHostname + "" + urlContent + " >Click to go to thread</a><b/>";

                    try
                    {
                        using(MailMessage emailMessage = new MailMessage())
                        {
                            var toAddress = new MailAddress(noti.User.Email);
                            emailMessage.To.Add(toAddress);
                            emailMessage.From = fromAddress;
                            emailMessage.Subject = "There has been new activity on KnowONE";
                            emailMessage.Body = body + url;
                            emailMessage.Priority = MailPriority.Normal;
                            emailMessage.IsBodyHtml = true;

                            try
                            {
                                await MailClient.SendMailAsync(emailMessage);
                            }
                            catch (Exception e)
                            {
                                System.Diagnostics.Debug.WriteLine(e.StackTrace);
                                return false;
                            }
                        }
                    }
                    catch (Exception e)
                    {
                        System.Diagnostics.Debug.WriteLine(e.StackTrace);
                        return false;
                    }
                }
            }

            MailClient.Dispose();
            return true;
        }
    }
}
