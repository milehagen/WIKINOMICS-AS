using Bachelor.DAL;
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
        private readonly IJwtTokenRepository _jwt;

        public NotificationController(INotificationRepository db, IJwtTokenRepository jwt)
        {
            _db = db;
            _jwt = jwt;
        }


        [HttpGet]
        [Route("GetNotifications/{userId}")]
        public async Task<ActionResult> GetNotifications(int userId)
        {
            try
            {
                bool access = _jwt.ValidateWithAccess(HttpContext, userId);
                if (!access)
                {
                    return Unauthorized(false);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(false);
            }

            List<Notification> notifications = await _db.GetNotifications(userId);
            if (notifications.IsNullOrEmpty())
            {
                return NotFound("No notifications found for user");
            }
            return Ok(notifications);
        }

        [HttpGet]
        [Route("GetNumberOfNotifications/{userId}")]
        public async Task<ActionResult> GetNumberOfNotifications(int userId)
        {
            try
            {
                bool access = _jwt.ValidateWithAccess(HttpContext, userId);
                if (!access)
                {
                    return Unauthorized(false);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(false);
            }

            int numberOfNotifications = await _db.GetNumberOfNotifications(userId);
            return Ok(numberOfNotifications);
        }

        [HttpGet]
        [Route("FindSubscription/{userId}/{postId}")]
        public async Task<ActionResult> FindSubscription(int userId, int postId)
        {
            try
            {
                bool access = _jwt.ValidateWithAccess(HttpContext, userId);
                if (!access)
                {
                    return Unauthorized(false);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(false);
            }

            Notification notification = await _db.FindSubscription(userId, postId);
            if (notification != null)
            {
                return Ok(notification);
            }
            return NotFound("No subscription found for user/post combination");
        }

        [HttpPost]
        [Route("Subscribe")]
        public async Task<ActionResult> Subscribe(Notification notification)
        {
            try
            {
                bool access = _jwt.ValidateWithAccess(HttpContext, notification.User.Id);
                if (!access)
                {
                    return Unauthorized(false);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(false);
            }
            if (ModelState.IsValid)
            {
                var resultOk = await _db.Subscribe(notification);
                if (!resultOk)
                {
                    return NotFound("Post or User was not found");
                }
                return Ok(true);
            }
            return BadRequest(ModelState);
        }


        [HttpDelete]
        [Route("Unsubscribe/{notificationId}")]
        public async Task<ActionResult> Unsubscribe(int notificationId)
        {
            var resultOk = await _db.Unsubscribe(notificationId);
            if (!resultOk)
            {
                return NotFound("Notification not found");
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
                return NotFound("No notifications to send to");
            }
            return Ok(true);
        }

        [HttpGet]
        [Route("SetNotificationsToViewed/{userId}")]
        public async Task<ActionResult> SetNotificationsToViewed(int userId)
        {
            try
            {
                bool access = _jwt.ValidateWithAccess(HttpContext, userId);
                if (!access)
                {
                    return Unauthorized(false);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(false);
            }

            var resultOk = await _db.SetNotificationsToViewed(userId);
            if (!resultOk)
            {
                return NotFound("User or notifications not found");
            }
            return Ok(true);
        }

        [HttpGet]
        [Route("ToggleMailNotifications/{userId}")]
        public async Task<ActionResult> ToggleMailNotifications(int userId)
        {
            try
            {
                bool access = _jwt.ValidateWithAccess(HttpContext, userId);
                if (!access)
                {
                    return Unauthorized(false);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(false);
            }

            var resultOk = await _db.ToggleMailNotifications(userId);
            if (!resultOk)
            {
                return NotFound("User not found");
            }
            return Ok(true);
        }

        [HttpGet]
        [Route("SendMail/{postId}/{userCreatingNotiId}")]
        public async Task<ActionResult> SendMail(int postId, int userCreatingNotiId)
        {
            var resultOk = await _db.SendMail(postId, userCreatingNotiId);
            if (!resultOk)
            {
                return NotFound("Post or notifications not found");
            }
            return Ok(true);
        }
    }
}
