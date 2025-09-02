using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Model
{
    public class ChatModel
    {
        public ChatModel()
        {
            this.Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; } // Guid or Mongo Id
        public string? Room { get; set; }
        public string? Sender { get; set; }
        public string? Type { get; set; } // "text" or "image"
        public string? Content { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}