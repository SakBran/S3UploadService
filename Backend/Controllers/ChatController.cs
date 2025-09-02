using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DBContext;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ChatController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string room)
        {
            var FirstValue = room?.Split("-AND-").FirstOrDefault();
            var SecondValue = room?.Split("-AND-").Skip(1).FirstOrDefault();
            var FixedRoomNo = $"{FirstValue}-AND-{SecondValue}";
            var FixedRoomNo2 = $"{SecondValue}-AND-{FirstValue}";
            if (string.IsNullOrEmpty(room))
            {
                return BadRequest("Room parameter is required.");
            }
            var isRoomExists = await _context.ChatModels.AnyAsync(m => m.Room == FixedRoomNo || m.Room == FixedRoomNo2);
            if (!isRoomExists)
            {
                return Ok(new List<ChatModel>());
            }
            var messages = await _context.ChatModels
                .Where(m => m.Room == FixedRoomNo || m.Room == FixedRoomNo2)
                .OrderByDescending(m => m.Timestamp)
                .Take(10)
                .OrderBy(m => m.Timestamp)
                .ToListAsync();
            return Ok(messages);
        }

        [HttpPost]
        public async Task<IActionResult> Post(ChatModel message)
        {
            message.Timestamp = DateTime.Now;
            await _context.ChatModels.AddAsync(message);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}