using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bachelor.Models.Notification;

namespace Bachelor.DAL.Notifications
{
    public interface INotificationRepository
    {
        Task<List<Notification>> GetNotifications(int userId);

        Task<int> GetNumberOfNotifications(int userId);

        Task<Notification> FindSubscription(int userId, int postId);

        Task<bool> Subscribe(Notification notification);

        Task<bool> Unsubscribe(int notificationId);

        Task<bool> SendNotification(int postId, int userCreatingNotiId);

        Task<bool> SetNotificationsToViewed(int userId);

        Task<bool> ToggleMailNotifications(int userId);

        Task<bool> SendMail(int postId, int userCreatingNotiId);
    }
}
