using Bachelor.Models;
using Bachelor.Models.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Bachelor.DAL.Users
{
    public class VerificationRepository : IVerificationRepository
    {
        private readonly UserDBContext _db;

        public VerificationRepository(UserDBContext db)
        {
            _db = db;
        }

        public async Task<List<Domain>> GetVerified()
        {
            try
            {
                List<Domain> domains = await _db.Domains.Where(d => d.Verified == true).ToListAsync();
                return domains;
            }
            catch(Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
                return null;
            }
        }

        public async Task<List<Domain>> GetUnverified()
        {
            try
            {
                List<Domain> domains = await _db.Domains.Where(d => d.Verified == false).ToListAsync();
                return domains;
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
                return null;
            }
        }



        public async Task<bool> CheckMail(string address)
        {
            try
            {
                string[] sub = address.Split('@');

                Domain checkDomain = await _db.Domains.FirstOrDefaultAsync(d => d.Name.ToLower() == sub[1].ToLower() && d.Verified == true);
                if(checkDomain != null)
                {
                    return true;
                }
                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> SendVerification(int experienceID, string address)
        {
            //Checking if said Experience exists
            try
            {
                bool checkExperience = await _db.Experiences.AnyAsync(exp => exp.Id == experienceID);
                if(!checkExperience)
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }

            //Encodes the ID so it doesn't seem so obvious in the URL
            string encodedExpID = Convert.ToBase64String(Encoding.UTF8.GetBytes(experienceID.ToString()));

            //Sets up SmtpClient and addresses
            var fromAddress = new MailAddress("newsletter@knowone.no", "KnowONE - Verification");
            var fromPassword = "opvkxjncelsnwrlk";
            var toAddress = new MailAddress("fail@fail.com");

            SmtpClient MailClient = new SmtpClient("smtp.gmail.com", 587);
            MailClient.EnableSsl = true;
            MailClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            MailClient.UseDefaultCredentials = false;
            MailClient.Credentials = new System.Net.NetworkCredential(fromAddress.Address, fromPassword);
            MailClient.Timeout = 20000;

            try
            {
                using(MailMessage mailMessage = new MailMessage())
                {
                    toAddress = new MailAddress(address);
                    mailMessage.To.Add(toAddress);
                    mailMessage.From = fromAddress;
                    mailMessage.Subject = "Verification of experience";
                    mailMessage.Body = "You have received this e-mail to verify your experience<br/>" +
                                       "<b>Please click the following link to complete the verification proccess: <b/><br/>" +
                                       "<a href=\"https://localhost:44321/verify?Exp=" + encodedExpID + "\"" + " >Click here to verify</a> <br/> <br/> <br/>" +
                                       "If you did not request verification you can ignore this e-mail.";

                    mailMessage.Priority = MailPriority.Normal;
                    mailMessage.IsBodyHtml = true;

                    try
                    {
                        await MailClient.SendMailAsync(mailMessage);
                        return true;
                    }
                    catch (Exception e)
                    {
                        System.Diagnostics.Debug.WriteLine(e);
                        return false;
                    }
                }
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Verify(int experienceID)
        {
            try
            {
                Experience experience = await _db.Experiences.FindAsync(experienceID);

                if (experience != null)
                {
                    experience.Verified = true;

                    await _db.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }

        }

        public async Task<bool> AddToReview(Domain domain)
        {
            try
            {
                string[] sub = domain.Name.Split('@');

                //Checking if domain is already here or not, if its not we add it
                //If it is then its already been suggested
                Domain checkDomain = await _db.Domains.FirstOrDefaultAsync(d => d.Name.ToLower() == sub[1].ToLower());
                if(checkDomain == null)
                {
                    var newDomain = new Domain
                    {
                        Name = sub[1].ToLower(),
                        Verified = false
                    };

                    await _db.Domains.AddAsync(newDomain);
                    await _db.SaveChangesAsync();
                    return true;
                }

                return true;
            }
            catch(Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> Add(Domain domain)
        {
            try
            {
                Domain checkDomain = await _db.Domains.FirstOrDefaultAsync(d => d.Name.ToLower() == domain.Name.ToLower());
                if(checkDomain == null)
                {
                    var newDomain = new Domain
                    {
                        Name = domain.Name.ToLower(),
                        Verified = true
                    };
                    await _db.Domains.AddAsync(newDomain);
                }
                else
                {
                    checkDomain.Verified = true;
                }

                await _db.SaveChangesAsync();
                return true;
            }
            catch(Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
                return false;
            }
        }

        public async Task<bool> Delete(string domain)
        {
            try
            {
                Domain checkDomain = await _db.Domains.FirstOrDefaultAsync(d => d.Name.ToLower() == domain.ToLower());
                if(checkDomain != null)
                {
                    _db.Remove(checkDomain);
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
    }
}
