using System;
using System.ComponentModel.DataAnnotations;

namespace API.Model
{
    public class User
    {
        public User()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Name = "";
            this.Password = "";
            this.Permission = "";

        }
        [Key]
        public string Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Permission { get; set; }
    }
}
