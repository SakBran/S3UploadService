using System;
using System.Threading.Tasks;
using API.Model;

namespace API.Interface
{
    public interface IJWTManagerService
    {
        Task<TokenModel?> Authenticate(User users);
        //TokenModel AuthenticateInspector(User users);
        TokenModel? RefreshToken(string RefreshToken);
        TokenModel? AuthenticateTradenet2(string users);

    }
}
