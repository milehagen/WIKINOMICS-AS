using Bachelor.DAL.Notifications;
using Bachelor.Models.Notification;
using Castle.Core.Internal;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bachelor.Controllers.Notifications
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {

        private readonly INotificationRepository _db;

        public NotificationController(INotificationRepository db)
        {
            _db = db;
        }


        [HttpGet]
        [Route("GetNotifications/{userId}")]
        public async Task<ActionResult> GetNotifications(int userId)
        {
            List<Notification> notifications = await _db.GetNotifications(userId);
            if (notifications.IsNullOrEmpty())
            {
                return NotFound();
            }
            return Ok(notifications);
        }

        [HttpGet]
        [Route("FindSubscription/{userId}/{postId}")]
        public async Task<ActionResult> FindSubscription(int userId, int postId)
        {
            Notification notification = await _db.FindSubscription(userId, postId);
            if (notification != null)
            {
                return Ok(notification);
            }
            return NotFound();
        }

        [HttpPost]
        [Route("Subscribe")]
        public async Task<ActionResult> Subscribe(Notification notification)
        {
            if (ModelState.IsValid)
            {
                var resultOk = await _db.Subscribe(notification);
                if (!resultOk)
                {
                    return BadRequest();
                }
                return Ok(true);
            }
            return BadRequest();
        }


        [HttpDelete]
        [Route("Unsubscribe/{notificationId}")]
        public async Task<ActionResult> Unsubscribe(int notificationId)
        {
            var resultOk = await _db.Unsubscribe(notificationId);
            if (!resultOk)
            {
                return NotFound();
            }
            return Ok(true);
        }

        [HttpGet]
        [Route("SendNotification/{postId}/{userCreatingNotiId}")]
        public async Task<ActionResult> SendNotification(int postId, int userCreatingNotiId)
        {
            var resultOk = await _db.SendNotification(postId, userCreatingNotiId);
            if (!resultOk)
            {
                return NotFound();
            }
            return Ok(true);
        }
    }
}
