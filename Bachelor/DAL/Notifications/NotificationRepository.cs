using System;
using System.Collections.Generic;
using System.Linq;
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
                List<Notification> notifications = await _db.Notifications.Where(noti => noti.User.Id == userId && noti.Notify == true).ToListAsync();
                return notifications;
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
                return null;
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
                        Notify = false
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
    }
}
