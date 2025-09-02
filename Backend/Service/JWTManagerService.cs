using API.Interface;
using API.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Service
{
    public class JWTManagerService : IJWTManagerService
    {

        private readonly IConfiguration iconfiguration;
        private readonly ICommonService<TokenModel> _tokenService;
        private readonly ICommonService<User> _userService;
        public JWTManagerService(IConfiguration iconfiguration,
        ICommonService<TokenModel> tokenService,
        ICommonService<User> userService
            )
        {
            this.iconfiguration = iconfiguration;
            _tokenService = tokenService;
            _userService = userService;
        }
        public async Task<TokenModel?> Authenticate(User users)
        {
            IQueryable<User> UsersRecords = _userService.Retrieve.Where(x => x.Name == users.Name && x.Password == users.Password);
            if (!UsersRecords.AsParallel().Any())
            {
                return null;
            }

            // Else we generate JSON Web Token
            var tempUser = await UsersRecords.FirstOrDefaultAsync();
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"] ?? "");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, tempUser?.Id??""),
                new Claim(ClaimTypes.Role, tempUser?.Permission??"")
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var refreshToken = Guid.NewGuid().ToString();
            var encryptedRefreshToken = Convert.ToBase64String(Encoding.UTF8.GetBytes(refreshToken));
            var userId = tempUser?.Id ?? "";
            var tokenObj = new TokenModel
            {
                Token = tokenHandler.WriteToken(token),
                RefreshToken = encryptedRefreshToken,
                UserId = userId,
                Permission = tempUser?.Permission ?? "",
            };
            await _tokenService.Create(tokenObj);
            return tokenObj;

        }
        public TokenModel AuthenticateTradenet2(String user)
        {

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"] ?? "");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, user),
                new Claim(ClaimTypes.Role, "User")
                }),
                Expires = DateTime.Now.AddDays(31),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var refreshToken = Guid.NewGuid().ToString();
            var encryptedRefreshToken = Convert.ToBase64String(Encoding.UTF8.GetBytes(refreshToken));
            var userId = user;
            var tokenObj = new TokenModel
            {
                Token = tokenHandler.WriteToken(token),
                RefreshToken = encryptedRefreshToken,
                UserId = userId,
                Permission = "User",
            };
            _tokenService.Create(tokenObj);
            return tokenObj;

        }



        public TokenModel? RefreshToken(string RefreshToken)
        {
            IQueryable<TokenModel> TokenRecord = _tokenService.Retrieve.Where(x => x.RefreshToken == RefreshToken);
            if (!TokenRecord.Any())
            {
                return null;
            }

            // Else we generate JSON Web Token
            var tempToken = TokenRecord.FirstOrDefault();
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JWT:Key"] ?? "");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                 new Claim(ClaimTypes.Name, tempToken?.UserId??"")
                }),
                Expires = DateTime.Now.AddDays(31),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var refreshToken = Guid.NewGuid().ToString();
            var encryptedRefreshToken = Convert.ToBase64String(Encoding.UTF8.GetBytes(refreshToken));
            var userId = tempToken?.UserId ?? "";
            var tokenObj = new TokenModel { Token = tokenHandler.WriteToken(token), RefreshToken = encryptedRefreshToken, UserId = userId };
            _tokenService.Create(tokenObj);
            _tokenService.Delete(tempToken?.Token ?? "");
            return tokenObj;

        }



    }
}
