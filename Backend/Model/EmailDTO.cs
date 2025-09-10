using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class EmailDTO
    {
        public string? FromEmail { get; set; }
        public string? FromName { get; set; }
        public string? ToEmail { get; set; }
        public string? ToName { get; set; }
        public string? Subject { get; set; }
        public string? PlainTextContent { get; set; }
        public string? HtmlContent { get; set; }
        public string? apiKey { get; set; }
    }
}