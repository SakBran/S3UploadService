using System;
using System.ComponentModel.DataAnnotations;

namespace API.Model
{
    public class TokenModel
    {
        public TokenModel()
        {
            this.Token = Guid.NewGuid().ToString();
        }
        [Key]
        public string Token { get; set; }
        public string? RefreshToken { get; set; }
        public string? UserId { get; set; }
        public string? Permission { get; set; }
    }
}
