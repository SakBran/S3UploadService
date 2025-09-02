using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DBContext;
using API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatList : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMemoryCache _memoryCache;
        public ChatList(ApplicationDbContext context, IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetChatList()
        {
            var cacheKey = "ChatListCache";
            if (!_memoryCache.TryGetValue(cacheKey, out List<User>? chatList))
            {
                chatList = await _context.Users.ToListAsync();
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromHours(1));
                _memoryCache.Set(cacheKey, chatList, cacheEntryOptions);
            }
            if (chatList == null || !chatList.Any())
            {
                return NotFound("No users found.");
            }
            return Ok(chatList);
        }
    }
}