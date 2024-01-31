using TeamSync.DTOs;
using TeamSync.Responses;

namespace TeamSync.Repositories.Contracts
{
    public interface IUserAccount
    {
        Task<GeneralResponse> CreateAsync(Register user);
        Task<LoginResponse> SignInAsync(Login user);

        Task<LoginResponse> RefreshTokenAsync(RefreshToken token);


    }
}
