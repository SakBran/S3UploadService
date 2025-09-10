using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        public async Task<IActionResult> SendEmail(EmailDTO data)
        {
            var apiKey = data.apiKey;
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(data.FromEmail, data.FromName);
            var to = new EmailAddress(data.ToEmail, data.ToName);

            var subject = data.Subject;
            var plainTextContent = data.PlainTextContent;
            var htmlContent = data.HtmlContent;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            if (response.StatusCode == System.Net.HttpStatusCode.Accepted)
            {
                Console.WriteLine("Email sent successfully!");
                return Ok("Email sent successfully!");
            }
            else
            {
                Console.WriteLine($"Failed to send email. Status code: {response.StatusCode}");
                return StatusCode((int)response.StatusCode, "Failed to send email.");
            }

        }
    }
}